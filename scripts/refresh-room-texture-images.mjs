#!/usr/bin/env node
/** Descarga fotografías profesionales para rooms/ y textures/ */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const WEBP = { quality: 84, effort: 4 };

const ROOM_QUERIES = {
  salon: "modern living room wood floor interior professional",
  cocina: "modern kitchen vinyl floor installed bright",
  dormitorio: "scandinavian bedroom wood floor interior",
  bano: "modern bathroom floor tiles wet room",
  "local-comercial": "retail store commercial floor interior",
  oficina: "modern office wood floor interior",
};

const TEXTURE_QUERIES = {
  roble: "oak wood floor plank close up texture",
  nogal: "walnut wood floor texture",
  gris: "grey oak floor texture",
  cemento: "concrete floor texture light",
  piedra: "stone tile floor beige texture",
  espiga: "herringbone parquet floor texture",
};

async function searchImage(query, page = 1) {
  for (let p = page; p <= page + 5; p++) {
    const url = new URL("https://api.openverse.org/v1/images/");
    url.searchParams.set("q", query);
    url.searchParams.set("page_size", "20");
    url.searchParams.set("page", String(p));
    const res = await fetch(url, {
      headers: { "User-Agent": "VinylProCanarias/1.0" },
    });
    if (!res.ok) continue;
    const data = await res.json();
    const results = (data.results ?? []).filter((r) => r.url);
    if (results.length) return results[0].url;
  }
  return null;
}

async function save(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "VinylProCanarias/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await sharp(buf).resize(1400, null, { withoutEnlargement: true }).webp(WEBP).toFile(dest);
  console.log("saved", dest);
}

async function main() {
  for (const [room, query] of Object.entries(ROOM_QUERIES)) {
    const dest = path.join(ROOT, "public/images/rooms", room, `${room}.webp`);
    const url = await searchImage(query, 2);
    if (url) await save(url, dest);
    else console.warn("no image for room", room);
    await new Promise((r) => setTimeout(r, 300));
  }

  for (const [tex, query] of Object.entries(TEXTURE_QUERIES)) {
    const dest = path.join(ROOT, "public/images/textures", tex, `${tex}.webp`);
    const url = await searchImage(query, 3);
    if (url) await save(url, dest);
    else console.warn("no image for texture", tex);
    await new Promise((r) => setTimeout(r, 300));
  }
}

main().catch(console.error);
