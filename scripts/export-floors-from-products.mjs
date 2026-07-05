#!/usr/bin/env node
/**
 * Exporta public/images/products/*.webp → public/floors/*.jpg
 * portada → closeup, textura → detalle
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PRODUCTS = path.join(ROOT, "public", "images", "products");
const FLOORS = path.join(ROOT, "public", "floors");

const MAP = {
  portada: "closeup",
  textura: "detalle",
  salon: "salon",
  cocina: "cocina",
  dormitorio: "dormitorio",
};

async function main() {
  let exported = 0;
  const slugs = await fs.readdir(PRODUCTS);
  for (const slug of slugs) {
    const srcDir = path.join(PRODUCTS, slug);
    const stat = await fs.stat(srcDir).catch(() => null);
    if (!stat?.isDirectory()) continue;

    const destDir = path.join(FLOORS, slug);
    await fs.mkdir(destDir, { recursive: true });

    for (const [srcShot, destShot] of Object.entries(MAP)) {
      const src = path.join(srcDir, `${srcShot}.webp`);
      const dest = path.join(destDir, `${destShot}.jpg`);
      try {
        await fs.access(src);
      } catch {
        continue;
      }
      try {
        await fs.access(dest);
        continue;
      } catch {
        /* export */
      }
      await sharp(src).jpeg({ quality: 88 }).toFile(dest);
      exported++;
    }
  }
  console.log(`Exported ${exported} images to public/floors/`);
}

main().catch(console.error);
