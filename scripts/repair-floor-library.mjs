#!/usr/bin/env node
/**
 * Rellena fotos faltantes en public/floors/{slug}/*.jpg
 */

import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import productSeeds from "../src/data/product-seeds.json" with { type: "json" };

const ROOT = path.resolve(import.meta.dirname, "..");
const FLOORS_DIR = path.join(ROOT, "public", "floors");
const SHOTS = ["closeup", "salon", "cocina", "dormitorio", "detalle"];

const SHOT_QUERIES = {
  closeup: ["vinyl floor close up", "laminate flooring texture", "wood plank surface"],
  salon: ["living room wood floor", "modern salon interior floor"],
  cocina: ["kitchen floor tiles interior", "kitchen vinyl flooring"],
  dormitorio: ["bedroom wooden floor", "bedroom interior flooring"],
  detalle: ["wood grain macro floor", "floor plank detail texture", "parquet grain close"],
};

const EXTRA = [
  "hardwood floor interior",
  "scandinavian floor design",
  "stone floor room",
  "herringbone parquet",
  "commercial floor interior",
];

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
      base.push(slugify(`${seed.baseSlug}-${variant.suffix}`));
    }
  }
  const all = [...base];
  for (const slug of base) all.push(`${slug}-xl`, `${slug}-compact`);
  return all;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

async function fileHash(filePath) {
  const buf = await fs.readFile(filePath);
  return createHash("sha256").update(buf).digest("hex");
}

async function loadUsedHashes() {
  const used = new Set();
  const slugs = await fs.readdir(FLOORS_DIR).catch(() => []);
  for (const slug of slugs) {
    for (const shot of SHOTS) {
      const p = path.join(FLOORS_DIR, slug, `${shot}.jpg`);
      try {
        await fs.access(p);
        used.add(await fileHash(p));
      } catch {
        /* missing */
      }
    }
  }
  return used;
}

async function fetchResults(query, page) {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "20");
  url.searchParams.set("page", String(page));
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0 (floor repair)" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results ?? []).filter((r) => r.url && r.width >= 480);
}

async function download(url, dest, usedHashes) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("too small");
  const h = createHash("sha256").update(buf).digest("hex");
  if (usedHashes.has(h)) throw new Error("duplicate content");
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  usedHashes.add(h);
}

async function main() {
  const slugs = expandSlugs();
  const usedHashes = await loadUsedHashes();
  const usedUrls = new Set();
  let fixed = 0;

  for (const slug of slugs) {
    for (const shot of SHOTS) {
      const dest = path.join(FLOORS_DIR, slug, `${shot}.jpg`);
      try {
        await fs.access(dest);
        continue;
      } catch {
        /* repair */
      }

      const seed = `${slug}-${shot}`;
      let saved = false;

      for (let attempt = 0; attempt < 50 && !saved; attempt++) {
        const queries = [
          ...(SHOT_QUERIES[shot] ?? []),
          ...EXTRA,
        ];
        const query = queries[(hash(seed) + attempt) % queries.length];
        const page = (hash(`${seed}-p-${attempt}`) % 40) + 1;
        const results = await fetchResults(query, page);
        const start = hash(`${seed}-i-${attempt}`) % Math.max(results.length, 1);

        for (let j = 0; j < results.length && !saved; j++) {
          const item = results[(start + j) % results.length];
          const urlKey = String(item.id ?? item.url);
          if (usedUrls.has(urlKey)) continue;

          try {
            await download(item.url, dest, usedHashes);
            usedUrls.add(urlKey);
            fixed++;
            console.log(`fixed ${slug}/${shot}.jpg`);
            saved = true;
          } catch {
            /* try next */
          }
        }
        await new Promise((r) => setTimeout(r, 120));
      }

      if (!saved) console.warn(`still missing ${slug}/${shot}.jpg`);
    }
  }

  console.log(`\nRepaired ${fixed} images.`);
}

main().catch(console.error);
