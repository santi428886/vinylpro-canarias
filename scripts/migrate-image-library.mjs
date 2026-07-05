#!/usr/bin/env node
/**
 * Migra public/floors/ → public/images/ (products, rooms, textures, icons).
 * Convierte JPG/PNG → WebP optimizado y deduplica por hash de contenido.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OLD_DIR = path.join(ROOT, "public", "floors");
const IMAGES = path.join(ROOT, "public", "images");
const PRODUCTS = path.join(IMAGES, "products");
const ROOMS = path.join(IMAGES, "rooms");
const TEXTURES = path.join(IMAGES, "textures");
const ICONS = path.join(IMAGES, "icons");

const SHOT_MAP = {
  closeup: "portada",
  detalle: "textura",
  salon: "salon",
  cocina: "cocina",
  dormitorio: "dormitorio",
};

const WEBP_OPTS = { quality: 82, effort: 4 };

/** @type {Map<string, string>} hash → canonical absolute path */
const hashToPath = new Map();

function hashBuffer(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

async function writeDeduped(dest, webpBuf) {
  const h = hashBuffer(webpBuf);
  const existing = hashToPath.get(h);
  if (existing) {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    try {
      await fs.unlink(dest);
    } catch {
      /* not exists */
    }
    await fs.link(existing, dest);
    return { deduped: true };
  }
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, webpBuf);
  hashToPath.set(h, dest);
  return { deduped: false };
}

async function convertToWebp(src, dest) {
  const webpBuf = await sharp(src).webp(WEBP_OPTS).toBuffer();
  return writeDeduped(dest, webpBuf);
}

async function migrateProducts() {
  let converted = 0;
  let deduped = 0;
  let skipped = 0;
  const slugs = [];

  let entries;
  try {
    entries = await fs.readdir(OLD_DIR, { withFileTypes: true });
  } catch {
    console.warn("No public/floors/ directory found.");
    return { converted, deduped, skipped, slugs };
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    slugs.push(slug);
    const srcDir = path.join(OLD_DIR, slug);
    const destDir = path.join(PRODUCTS, slug);

    for (const [oldName, newName] of Object.entries(SHOT_MAP)) {
      for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
        const src = path.join(srcDir, `${oldName}${ext}`);
        const dest = path.join(destDir, `${newName}.webp`);
        try {
          await fs.access(src);
        } catch {
          continue;
        }
        try {
          await fs.access(dest);
          skipped++;
          continue;
        } catch {
          /* convert */
        }
        const { deduped: isDedup } = await convertToWebp(src, dest);
        if (isDedup) deduped++;
        else converted++;
      }
    }
  }

  return { converted, deduped, skipped, slugs };
}

async function linkAsset(srcRel, destRel) {
  const src = path.join(IMAGES, srcRel);
  const dest = path.join(IMAGES, destRel);
  try {
    await fs.access(src);
  } catch {
    console.warn(`  skip (missing source): ${srcRel}`);
    return false;
  }
  await fs.mkdir(path.dirname(dest), { recursive: true });
  try {
    await fs.unlink(dest);
  } catch {
    /* not exists */
  }
  try {
    await fs.link(src, dest);
  } catch {
    await fs.copyFile(src, dest);
  }
  return true;
}

async function populateRoomsAndTextures() {
  const rooms = [
    { folder: "salon", src: "products/roble-natural-claro/salon.webp", name: "salon.webp" },
    { folder: "cocina", src: "products/cemento-urban-blanco/cocina.webp", name: "cocina.webp" },
    { folder: "bano", src: "products/piedra-caliza-marfil/portada.webp", name: "bano.webp" },
    { folder: "dormitorio", src: "products/roble-gris-nordico-plata/dormitorio.webp", name: "dormitorio.webp" },
    { folder: "local-comercial", src: "products/roble-gris-nordico-plata/salon.webp", name: "local-comercial.webp" },
    { folder: "oficina", src: "products/cemento-urban-gris/salon.webp", name: "oficina.webp" },
  ];

  const textures = [
    { folder: "roble", src: "products/roble-natural-claro/portada.webp", name: "roble.webp" },
    { folder: "nogal", src: "products/espiga-milan-nogal/portada.webp", name: "nogal.webp" },
    { folder: "gris", src: "products/roble-gris-nordico-plata/portada.webp", name: "gris.webp" },
    { folder: "cemento", src: "products/cemento-urban-gris/portada.webp", name: "cemento.webp" },
    { folder: "piedra", src: "products/piedra-caliza-marfil/portada.webp", name: "piedra.webp" },
    { folder: "espiga", src: "products/espiga-heritage-natural/portada.webp", name: "espiga.webp" },
  ];

  let linked = 0;
  for (const r of rooms) {
    if (await linkAsset(r.src, `rooms/${r.folder}/${r.name}`)) linked++;
  }
  for (const t of textures) {
    if (await linkAsset(t.src, `textures/${t.folder}/${t.name}`)) linked++;
  }
  return linked;
}

async function migrateIcons() {
  const publicDir = path.join(ROOT, "public");
  const svgNames = ["file.svg", "window.svg", "vercel.svg", "next.svg", "globe.svg"];
  let moved = 0;
  await fs.mkdir(ICONS, { recursive: true });
  for (const name of svgNames) {
    const src = path.join(publicDir, name);
    const dest = path.join(ICONS, name);
    try {
      await fs.access(src);
      await fs.rename(src, dest);
      moved++;
    } catch {
      /* not in root */
    }
  }
  return moved;
}

async function removeOldFloors() {
  try {
    await fs.rm(OLD_DIR, { recursive: true, force: true });
  } catch {
    /* already gone */
  }
  const oldReadme = path.join(IMAGES, "floors");
  try {
    await fs.rm(oldReadme, { recursive: true, force: true });
  } catch {
    /* already gone */
  }
}

async function main() {
  await fs.mkdir(PRODUCTS, { recursive: true });
  await fs.mkdir(ROOMS, { recursive: true });
  await fs.mkdir(TEXTURES, { recursive: true });

  console.log("Migrating product images…");
  const productStats = await migrateProducts();
  console.log(
    `  ${productStats.slugs.length} slugs · ${productStats.converted} converted · ${productStats.deduped} deduped · ${productStats.skipped} skipped`,
  );

  console.log("Populating rooms/ and textures/…");
  const linked = await populateRoomsAndTextures();
  console.log(`  ${linked} assets linked`);

  console.log("Moving icons…");
  const iconsMoved = await migrateIcons();
  console.log(`  ${iconsMoved} SVGs moved`);

  console.log("Removing old public/floors/…");
  await removeOldFloors();

  console.log("\nMigration complete.");
  return { ...productStats, linked, iconsMoved };
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
