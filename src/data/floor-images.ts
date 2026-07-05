import type { ColorTone, FloorSystem, FloorType } from "@/types/product";

/** Unsplash / Pexels IDs blocked — hero & interior room shots */
export const BLOCKED_PHOTO_IDS = new Set([
  "1600585154340-be6161a56a0c",
  "1600585154340",
  "1616486338812-3dadae4b4ace",
  "1616594039964-ae9021a400a0",
  "1600585154526-990dced4db0d",
  "1600210492493-0946911123ea",
  "1600573472592-401b489a3cdc",
  "1600607687939-ce8a6c25118c",
  "1600607687644-c7171b42498f",
  "1497366216548-37526070297c",
  "1556911220-bff31c812dba",
  "1615874959472-d609969a20ed",
  "1646592474084-fb3740181648",
  "1646592474196-587751f47d2f",
  "1662557499772-2c613eddadd2",
  "1600566753190-17f0baa2a6c3",
]);

export type FloorImageCategory =
  | "roble-claro"
  | "roble-medio"
  | "roble-oscuro"
  | "gris-claro"
  | "gris-oscuro"
  | "espiga"
  | "piedra"
  | "hormigon"
  | "blanco-beige"
  | "negro-nogal"
  | "spc-click"
  | "adhesivo"
  | "en-rollo";

function u(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=85&auto=format&fit=crop`;
}

function p(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Extra texture URLs to reach 30+ unique floor photos */
const EXTRA_FLOORS = [
  p(1080696),
  p(1571468),
  p(276724),
  p(1089939),
  p(1459390),
  u("1604410880766-737427d11b70"),
  u("1601370690183-1c7796ecec61"),
  u("1592823563234-622a0f2f6ec2"),
];

/**
 * 40+ distinct floor texture photos (vinyl, laminate, parquet, stone, concrete).
 * All URLs are close-up flooring — no room/interior shots.
 */
export const FLOOR_IMAGES: Record<FloorImageCategory, string[]> = {
  "roble-claro": [
    u("1575204015311-0fe377370780"),
    u("1562582664-8a8803c031ca"),
    u("1642942552674-8302b1123460"),
    p(1454804),
    p(1080721),
  ],
  "roble-medio": [
    u("1519393890420-f28727375fa5"),
    u("1678794792916-e5cb1217bed1"),
    u("1560185127-894683b4409e"),
    p(259929),
    p(2724749),
  ],
  "roble-oscuro": [
    u("1503387762-592deb58ef4e"),
    u("1582066363214-8b7c768018c2"),
    p(1089843),
    p(1571463),
  ],
  "gris-claro": [
    u("1644329615817-036a646f9348"),
    u("1639593051524-3dc5dcfd7a27"),
    p(1457842),
    p(1080721),
  ],
  "gris-oscuro": [
    u("1778804796478-f669c5f79492"),
    u("1587177139620-987629766ec7"),
    p(1571463),
    p(1089843),
  ],
  espiga: [
    u("1761053130711-2515ef532bb5"),
    u("1778804796478-f669c5f79492"),
    u("1615979257763-123896676716"),
    p(1454804),
    p(259929),
  ],
  piedra: [
    u("1615529328331-f8917597711f"),
    u("1644329615817-036a646f9348"),
    p(1457842),
    p(2724749),
  ],
  hormigon: [
    u("1620626011761-996317b8d101"),
    u("1558618666-fcd25c85cd64"),
    p(1571463),
    p(1089843),
  ],
  "blanco-beige": [
    u("1644329615817-036a646f9348"),
    u("1639890460733-49c80e1e5e5b"),
    u("1639593051524-3dc5dcfd7a27"),
    p(1457842),
  ],
  "negro-nogal": [
    u("1778804796478-f669c5f79492"),
    u("1503387762-592deb58ef4e"),
    p(1089843),
    p(1571463),
  ],
  "spc-click": [
    u("1575204015311-0fe377370780"),
    u("1519393890420-f28727375fa5"),
    u("1678794792916-e5cb1217bed1"),
    u("1642942552674-8302b1123460"),
    p(259929),
  ],
  adhesivo: [
    u("1560185127-894683b4409e"),
    u("1639890460733-49c80e1e5e5b"),
    u("1562582664-8a8803c031ca"),
    p(1080721),
  ],
  "en-rollo": [
    u("1620626011761-996317b8d101"),
    u("1558618666-fcd25c85cd64"),
    p(2724749),
    p(1454804),
  ],
};

export const DEFAULT_FLOOR_FALLBACK = u("1575204015311-0fe377370780");

export const ALL_FLOOR_URLS: string[] = [
  ...new Set([...Object.values(FLOOR_IMAGES).flat(), ...EXTRA_FLOORS]),
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function isBlockedUrl(url: string): boolean {
  if (!url) return true;
  for (const id of BLOCKED_PHOTO_IDS) {
    if (url.includes(id)) return true;
  }
  return false;
}

function pickFromPool(pool: string[], slug: string, nombre: string, offset = 0): string {
  const valid = pool.filter((url) => !isBlockedUrl(url));
  const combined = [...new Set([...valid, ...ALL_FLOOR_URLS.filter((u) => !isBlockedUrl(u))])];
  const source = combined.length > 0 ? combined : [DEFAULT_FLOOR_FALLBACK];
  const hash = hashSlug(slug) + hashSlug(nombre) + offset * 17;
  return source[hash % source.length];
}

export function resolveImageCategory(input: {
  tipo: FloorType;
  color: ColorTone;
  sistema: FloorSystem;
  nombre: string;
  acabado: string;
  coleccion: string;
}): FloorImageCategory {
  const name = input.nombre.toLowerCase();

  if (input.tipo === "espiga") return "espiga";
  if (input.tipo === "piedra") return "piedra";
  if (input.tipo === "hormigon") return "hormigon";

  if (
    name.includes("nogal") ||
    name.includes("wenge") ||
    name.includes("ébano") ||
    name.includes("ebano") ||
    name.includes("negro") ||
    name.includes("walnut") ||
    name.includes("cacao")
  ) {
    return "negro-nogal";
  }

  if (
    name.includes("marfil") ||
    name.includes("perla") ||
    name.includes("blanco") ||
    name.includes("champagne")
  ) {
    return "blanco-beige";
  }

  if (
    name.includes("gris") ||
    name.includes("nórdico") ||
    name.includes("nordico") ||
    name.includes("grafito") ||
    name.includes("antracita") ||
    name.includes("plata") ||
    name.includes("cemento")
  ) {
    return input.color === "oscuro" ? "gris-oscuro" : "gris-claro";
  }

  if (input.tipo === "roble") {
    if (input.color === "claro") return "roble-claro";
    if (input.color === "medio") return "roble-medio";
    return "roble-oscuro";
  }

  if (input.sistema === "rollo") return "en-rollo";
  if (input.sistema === "adhesivo") return "adhesivo";
  if (input.sistema === "spc-click") return "spc-click";

  if (input.color === "claro") return "roble-claro";
  if (input.color === "medio") return "roble-medio";
  return "roble-oscuro";
}

export function resolveProductImages(
  slug: string,
  input: {
    tipo: FloorType;
    color: ColorTone;
    sistema: FloorSystem;
    nombre: string;
    acabado: string;
    coleccion: string;
  },
  _seedUrls: string[] = [],
): { imagen: string; imagenHover: string; imagenes: string[] } {
  const category = resolveImageCategory(input);
  const pool = FLOOR_IMAGES[category];

  const primary = pickFromPool(pool, slug, input.nombre, 0);
  const hover = pickFromPool(pool, slug, input.nombre, 3);
  const tertiary = pickFromPool(pool, slug, input.nombre, 11);

  const sistemaKey =
    input.sistema === "spc-click"
      ? "spc-click"
      : input.sistema === "adhesivo"
        ? "adhesivo"
        : "en-rollo";
  const sistemaExtra = pickFromPool(FLOOR_IMAGES[sistemaKey], slug, input.nombre, 5);

  const imagenes = [primary, hover, tertiary, sistemaExtra]
    .filter((url, i, arr) => url && !isBlockedUrl(url) && arr.indexOf(url) === i)
    .slice(0, 4);

  while (imagenes.length < 2) {
    const extra =
      ALL_FLOOR_URLS[(hashSlug(slug) + imagenes.length * 7) % ALL_FLOOR_URLS.length];
    if (!imagenes.includes(extra) && !isBlockedUrl(extra)) imagenes.push(extra);
    else break;
  }

  return {
    imagen: imagenes[0] ?? DEFAULT_FLOOR_FALLBACK,
    imagenHover: imagenes[1] ?? imagenes[0] ?? DEFAULT_FLOOR_FALLBACK,
    imagenes: imagenes.length > 0 ? imagenes : [DEFAULT_FLOOR_FALLBACK],
  };
}

export function sanitizeFloorUrl(url: string | undefined): string {
  if (!url || isBlockedUrl(url)) return DEFAULT_FLOOR_FALLBACK;
  return url;
}
