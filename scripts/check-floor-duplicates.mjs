#!/usr/bin/env node
/** Verifica duplicados por hash SHA-256 en public/floors/ */

import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const FLOORS = path.resolve("public/floors");
const SHOTS = ["closeup", "salon", "cocina", "dormitorio", "detalle"];

async function main() {
  const hashToFiles = new Map();
  const slugs = await fs.readdir(FLOORS);
  let total = 0;

  for (const slug of slugs) {
    if (slug === "README.md") continue;
    const dir = path.join(FLOORS, slug);
    const stat = await fs.stat(dir).catch(() => null);
    if (!stat?.isDirectory()) continue;

    for (const shot of SHOTS) {
      const file = path.join(dir, `${shot}.jpg`);
      try {
        const buf = await fs.readFile(file);
        const h = createHash("sha256").update(buf).digest("hex");
        const key = `${slug}/${shot}.jpg`;
        if (!hashToFiles.has(h)) hashToFiles.set(h, []);
        hashToFiles.get(h).push(key);
        total++;
      } catch {
        /* missing */
      }
    }
  }

  const dupes = [...hashToFiles.entries()].filter(([, files]) => files.length > 1);
  console.log(`Total images: ${total}`);
  console.log(`Unique hashes: ${hashToFiles.size}`);
  console.log(`Duplicate groups: ${dupes.length}`);
  if (dupes.length) {
    for (const [, files] of dupes.slice(0, 10)) {
      console.log("  DUPLICATE:", files.join(" = "));
    }
  }
  process.exit(dupes.length ? 1 : 0);
}

main().catch(console.error);
