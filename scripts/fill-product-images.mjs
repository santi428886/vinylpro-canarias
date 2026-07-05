#!/usr/bin/env node
/**
 * Completa imágenes faltantes:
 * 1. Variantes XL/Compact heredan del slug base
 * 2. Mismo producto: copia portada → huecos restantes
 * 3. Openverse con consultas específicas por tipo de suelo
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import productSeeds from "../src/data/product-seeds.json" with { type: "json" };

const ROOT = path.resolve(import.meta.dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "images", "products");
const SHOTS = ["portada", "salon", "cocina", "dormitorio", "textura"];
const WEBP_OPTS = { quality: 82, effort: 4 };

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function expandProducts() {
  const products = [];
  for (const seed of productSeeds) {
    for (const variant of seed.variants) {
      const slug = slugify(`${seed.baseSlug}-${variant.suffix}`);
      products.push({ slug, tipo: seed.tipo, color: variant.color, seed });
    }
  }
  const extended = [...products];
  for (const p of products) {
    extended.push({ ...p, slug: `${p.slug}-xl` });
    extended.push({ ...p, slug: `${p.slug}-compact` });
  }
  return extended;
}

function baseSlug(slug) {
  return slug.replace(/-(xl|compact)$/, "");
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function copyWebp(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

/** Ligera variación para variantes XL/Compact (mismo producto, archivo distinto) */
async function deriveWebp(src, dest, variant) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const img = sharp(src);
  const meta = await img.metadata();
  const w = meta.width ?? 1200;
  const h = meta.height ?? 800;
  const cropW = Math.floor(w * 0.92);
  const cropH = Math.floor(h * 0.92);
  const left = variant === "xl" ? 0 : Math.floor(w * 0.04);
  const top = variant === "xl" ? 0 : Math.floor(h * 0.04);

  await img
    .extract({ left, top, width: cropW, height: cropH })
    .resize(Math.min(w, 1400), null, { withoutEnlargement: true })
    .webp(WEBP_OPTS)
    .toFile(dest);
}

function shotQuery(tipo, color, shot) {
  const tone =
    color === "claro" ? "light" : color === "oscuro" ? "dark" : "natural";
  const tipoMap = {
    roble: "oak wood floor",
    espiga: "herringbone parquet floor",
    piedra: "stone tile floor",
    hormigon: "concrete floor",
  };
  const base = tipoMap[tipo] ?? "vinyl plank floor";
  const shotMap = {
    portada: `${base} ${tone} close up texture`,
    textura: `${base} grain detail macro`,
    salon: `living room ${base} ${tone} interior`,
    cocina: `kitchen ${base} ${tone} floor`,
    dormitorio: `bedroom ${base} ${tone} floor`,
  };
  return shotMap[shot] ?? `${base} ${tone}`;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

async function fetchOpenverse(query, page) {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "20");
  url.searchParams.set("page", String(page));
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results ?? []).filter((r) => r.url && r.width >= 600);
}

async function downloadWebp(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error("too small");
  const webp = await sharp(buf).webp(WEBP_OPTS).toBuffer();
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, webp);
}

async function main() {
  const products = expandProducts();
  const usedUrls = new Set();
  let copied = 0;
  let downloaded = 0;

  // Cargar URLs ya usadas desde manifest si existe
  for (const slug of await fs.readdir(PRODUCTS_DIR)) {
    for (const shot of SHOTS) {
      const p = path.join(PRODUCTS_DIR, slug, `${shot}.webp`);
      if (await exists(p)) copied++;
    }
  }

  // Paso 1: XL/Compact desde base
  for (const { slug } of products) {
    const variant = slug.endsWith("-xl")
      ? "xl"
      : slug.endsWith("-compact")
        ? "compact"
        : null;
    if (!variant) continue;

    const base = baseSlug(slug);
    for (const shot of SHOTS) {
      const dest = path.join(PRODUCTS_DIR, slug, `${shot}.webp`);
      if (await exists(dest)) continue;
      const src = path.join(PRODUCTS_DIR, base, `${shot}.webp`);
      if (!(await exists(src))) continue;
      await deriveWebp(src, dest, variant);
      console.log(`derived ${slug}/${shot}.webp ← ${base}`);
      copied++;
    }
  }

  // Paso 2: Openverse para imágenes faltantes
  for (const { slug, tipo, color } of products) {
    for (const shot of SHOTS) {
      const dest = path.join(PRODUCTS_DIR, slug, `${shot}.webp`);
      if (await exists(dest)) continue;

      const query = shotQuery(tipo, color, shot);
      let saved = false;

      for (let attempt = 0; attempt < 40 && !saved; attempt++) {
        const page = (hash(`${slug}-${shot}-${attempt}`) % 30) + 1;
        const results = await fetchOpenverse(query, page);
        const idx = hash(`${slug}-${shot}-i-${attempt}`) % Math.max(results.length, 1);
        const item = results[idx];
        if (!item) continue;
        const key = String(item.id ?? item.url);
        if (usedUrls.has(key)) continue;

        try {
          await downloadWebp(item.url, dest);
          usedUrls.add(key);
          console.log(`downloaded ${slug}/${shot}.webp`);
          downloaded++;
          saved = true;
        } catch {
          /* retry */
        }
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  }

  // Paso 3: portada rellena huecos restantes (mismo producto)
  for (const { slug } of products) {
    const portada = path.join(PRODUCTS_DIR, slug, "portada.webp");
    if (!(await exists(portada))) continue;
    for (const shot of SHOTS) {
      if (shot === "portada") continue;
      const dest = path.join(PRODUCTS_DIR, slug, `${shot}.webp`);
      if (await exists(dest)) continue;
      await copyWebp(portada, dest);
      console.log(`fallback ${slug}/${shot}.webp ← portada`);
    }
  }

  const folders = await fs.readdir(PRODUCTS_DIR);
  let fileCount = 0;
  for (const slug of folders) {
    for (const shot of SHOTS) {
      if (await exists(path.join(PRODUCTS_DIR, slug, `${shot}.webp`))) fileCount++;
    }
  }
  console.log(`\nDone. Downloaded: ${downloaded}. Total shots on disk: ${fileCount}/${folders.length * SHOTS.length}.`);
}

main().catch(console.error);
