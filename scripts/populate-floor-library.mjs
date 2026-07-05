#!/usr/bin/env node
/**
 * Descarga fotografías únicas por modelo en public/images/products/{slug}/.
 * Fuente: Openverse (CC0 / dominio público). Sin repetir URL entre modelos.
 *
 * Uso: npm run images:populate
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import productSeeds from "../src/data/product-seeds.json" with { type: "json" };

const ROOT = path.resolve(import.meta.dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "images", "products");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "floor-image-manifest.json");

const SHOTS = ["portada", "salon", "cocina", "dormitorio", "textura"];

const SHOT_QUERIES = {
  portada: [
    "vinyl floor plank close up",
    "laminate flooring texture",
    "wood floor surface detail",
    "herringbone floor close",
    "stone tile floor texture",
  ],
  salon: [
    "living room wood floor interior",
    "modern salon laminate flooring",
    "scandinavian living room floor",
  ],
  cocina: [
    "kitchen vinyl floor installed",
    "modern kitchen wood floor",
    "white kitchen floor tiles",
  ],
  dormitorio: [
    "bedroom wood floor interior",
    "master bedroom laminate floor",
    "cozy bedroom flooring",
  ],
  textura: [
    "wood grain floor macro",
    "floor plank edge detail",
    "herringbone wood detail",
    "stone floor grain detail",
  ],
};

const WEBP_OPTS = { quality: 82, effort: 4 };

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function expandSlugs() {
  const base = [];
  for (const seed of productSeeds) {
    for (const variant of seed.variants) {
      const slug = slugify(`${seed.baseSlug}-${variant.suffix}`);
      base.push({
        slug,
        tipo: seed.tipo,
        color: variant.color,
        nombre: `${seed.baseName} ${variant.suffix}`,
      });
    }
  }
  const all = [...base];
  for (const p of base) {
    all.push({ ...p, slug: `${p.slug}-xl`, nombre: `${p.nombre} XL` });
    all.push({ ...p, slug: `${p.slug}-compact`, nombre: `${p.nombre} Compact` });
  }
  return all;
}

function tipoQuery(tipo, color) {
  const tone =
    color === "claro" ? "light" : color === "oscuro" ? "dark" : "natural";
  const map = {
    roble: `oak wood floor ${tone}`,
    espiga: `herringbone parquet ${tone}`,
    piedra: `stone tile floor ${tone}`,
    hormigon: `concrete floor ${tone}`,
  };
  return map[tipo] ?? `vinyl floor ${tone}`;
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
    headers: { "User-Agent": "VinylProCanarias/1.0 (floor catalog builder)" },
  });
  if (!res.ok) throw new Error(`Openverse ${res.status}: ${query}`);
  const data = await res.json();
  return (data.results ?? []).filter((r) => r.url && r.width >= 600);
}

async function downloadAndConvert(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`Image too small: ${url}`);
  const webp = await sharp(buf).webp(WEBP_OPTS).toBuffer();
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, webp);
}

async function pickUniqueImage(usedUrls, product, shot, attempt = 0) {
  const queries = [
    `${tipoQuery(product.tipo, product.color)} ${shot}`,
    SHOT_QUERIES[shot][hash(`${product.slug}-${shot}`) % SHOT_QUERIES[shot].length],
    SHOT_QUERIES[shot][0],
  ];
  const query = queries[attempt % queries.length];
  const page = 1 + ((hash(`${product.slug}-${shot}-${attempt}`) % 8) + 1);
  const results = await fetchOpenverse(query, page);

  for (const item of results) {
    const key = item.identifier ?? item.url;
    if (usedUrls.has(key)) continue;
    usedUrls.add(key);
    return { url: item.url, source: item.source ?? "openverse", query };
  }

  if (attempt < 24) {
    await new Promise((r) => setTimeout(r, 250));
    return pickUniqueImage(usedUrls, product, shot, attempt + 1);
  }

  const fallbackPage = 10 + (hash(`${product.slug}-${shot}-fb`) % 15);
  const fallback = await fetchOpenverse("interior floor photography", fallbackPage);
  for (const item of fallback) {
    const key = item.identifier ?? item.url;
    if (usedUrls.has(key)) continue;
    usedUrls.add(key);
    return { url: item.url, source: item.source ?? "openverse", query: "fallback" };
  }

  throw new Error(`No unique image for ${product.slug}/${shot}`);
}

async function main() {
  const products = expandSlugs();
  const usedUrls = new Set();
  const manifest = {};

  await fs.mkdir(PRODUCTS_DIR, { recursive: true });

  console.log(`Populating ${products.length} models × ${SHOTS.length} photos…`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const dir = path.join(PRODUCTS_DIR, product.slug);
    await fs.mkdir(dir, { recursive: true });
    manifest[product.slug] = {};

    for (const shot of SHOTS) {
      const dest = path.join(dir, `${shot}.webp`);
      try {
        await fs.access(dest);
        console.log(`  skip ${product.slug}/${shot}.webp`);
        manifest[product.slug][shot] = { cached: true };
        continue;
      } catch {
        /* download */
      }

      process.stdout.write(
        `[${i + 1}/${products.length}] ${product.slug}/${shot}… `,
      );

      try {
        const picked = await pickUniqueImage(usedUrls, product, shot);
        await downloadAndConvert(picked.url, dest);
        manifest[product.slug][shot] = {
          url: picked.url,
          query: picked.query,
          source: picked.source,
        };
        console.log("ok");
      } catch (err) {
        console.log(`FAIL (${err.message})`);
      }

      await new Promise((r) => setTimeout(r, 200));
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest: ${MANIFEST_PATH}`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
