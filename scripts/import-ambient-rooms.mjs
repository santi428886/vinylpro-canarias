#!/usr/bin/env node
/**
 * Importa fotografías de ambiente → public/images/rooms/ambient/*.webp
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.resolve(ROOT, "..", ".cursor/projects/Users-santiago-vinil/assets");
const OUT = path.join(ROOT, "public/images/rooms/ambient");

const IMPORTS = [
  {
    src: "PISOS_GRIS-4333a002-41bd-4515-97ad-f3230048e3eb.png",
    dest: "gris-claro-premium.webp",
  },
  {
    src: "194bf1a6190cbb2849838998b0637605-fa8c4247-8a7e-41ec-af95-91e852e79180.png",
    dest: "gris-nordico.webp",
  },
  {
    src: "1c6b068b1967ed46e430ae23dc214ef4-7ab405ce-f93e-400f-a965-1aa29ae3a412.png",
    dest: "roble-natural.webp",
  },
  {
    src: "32f0f957f8c8361091e0797aabb0db2f-7ba8bad2-c913-49d7-9c1a-8ea47dfe7a5a.png",
    dest: "roble-miel.webp",
  },
  {
    src: "PISOS_BEIGE-7bdc7728-5c40-4ba2-821d-34b269008c91.png",
    dest: "beige-arena.webp",
  },
  {
    src: "PISOS_ROBLE_OSCURO_-81ae960f-38cb-4104-93dc-46db82256050.png",
    dest: "roble-oscuro.webp",
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const { src, dest } of IMPORTS) {
  const input = path.join(ASSETS, src);
  const output = path.join(OUT, dest);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing: ${src}`);
    continue;
  }
  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);
  const stat = fs.statSync(output);
  console.log(`✓ ${dest} (${Math.round(stat.size / 1024)} KB)`);
}

console.log(`\nImported ${IMPORTS.length} ambient images to ${OUT}`);
