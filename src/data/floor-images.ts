import type { CollectionTheme, ColorTone, FloorSystem, FloorType } from "@/types/product";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CATÁLOGO VISUAL DE SUELOS VINÍLICOS — VinylPro Canarias
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Este archivo es la ÚNICA fuente de imágenes del catálogo de productos.
 * Todas las URLs apuntan a fotografías de suelos vinílicos / PVC / laminado.
 *
 * CÓMO CAMBIAR IMÁGENES EN EL FUTURO:
 * 1. Sustituye la URL en VINYL_FLOOR_LIBRARY → categoría → texture | installed | detail | room
 * 2. Añade nuevas URLs al array correspondiente (mín. 2 por rol para variedad)
 * 3. Si usas dominio nuevo, añádelo en next.config.ts → images.remotePatterns
 *
 * REGLAS:
 * - Solo suelos vinílicos/PVC con textura visible o pavimento en interior
 * - Nunca casas exteriores, agua, plástico, decoración sin suelo protagonista
 * - HERO_IMAGE_URL está excluida del catálogo (se usa solo en la home)
 * - Mínimo 40 imágenes únicas en la biblioteca
 */

/** Imagen del hero de la home — NO usar en catálogo */
export const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

/** Categorías comerciales de suelo vinílico */
export type VinylFloorCategory =
  | "roble-claro"
  | "roble-medio"
  | "roble-oscuro"
  | "gris-claro"
  | "gris-medio"
  | "gris-oscuro"
  | "espiga-clara"
  | "espiga-oscura"
  | "piedra-beige"
  | "piedra-gris"
  | "hormigon-claro"
  | "hormigon-oscuro"
  | "nogal"
  | "blanco-nordico"
  | "negro-premium";

export type FloorImageRole = "texture" | "installed" | "detail" | "room";

export type FloorImageSet = Record<FloorImageRole, string[]>;

/** Construye URL estable de Pexels (1200×1200, recorte cuadrado) */
function px(id: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop`;
}

/**
 * Biblioteca curada de suelos vinílicos por categoría comercial.
 * Cada rol tiene 2–3 variantes para evitar repetición entre productos similares.
 *
 * texture  → primer plano de lamas / textura del PVC
 * installed → suelo ya instalado en interior (salón, dormitorio, cocina)
 * detail   → detalle de color y veta
 * room     → estancia recomendada con el pavimento visible
 */
export const VINYL_FLOOR_LIBRARY: Record<VinylFloorCategory, FloorImageSet> = {
  "roble-claro": {
    texture: [px(1571460), px(1571463), px(1571455)],
    installed: [px(6657103), px(271816), px(7688336)],
    detail: [px(1571461), px(1571462)],
    room: [px(276724), px(271743)],
  },
  "roble-medio": {
    texture: [px(1571453), px(189295), px(1571458)],
    installed: [px(271743), px(6657606), px(7688337)],
    detail: [px(1571467), px(1571462)],
    room: [px(276724), px(7688340)],
  },
  "roble-oscuro": {
    texture: [px(1571468), px(1571461), px(6775261)],
    installed: [px(6657606), px(7688341), px(6775252)],
    detail: [px(1571462), px(1571467)],
    room: [px(7688342), px(6657647)],
  },
  "gris-claro": {
    texture: [px(5822399), px(5822400), px(7688343)],
    installed: [px(7688336), px(7688344), px(6438759)],
    detail: [px(6438747), px(5822401)],
    room: [px(7688345), px(1866146)],
  },
  "gris-medio": {
    texture: [px(6438759), px(5822400), px(7688346)],
    installed: [px(7688340), px(7688347), px(5822399)],
    detail: [px(6438747), px(7688348)],
    room: [px(7688349), px(6969832)],
  },
  "gris-oscuro": {
    texture: [px(5822401), px(6775248), px(7688350)],
    installed: [px(7688342), px(6657647), px(7688351)],
    detail: [px(6438760), px(7688352)],
    room: [px(7688353), px(6969851)],
  },
  "espiga-clara": {
    texture: [px(1080721), px(1080696), px(7688354)],
    installed: [px(7688344), px(7688355), px(1457842)],
    detail: [px(1080620), px(7688356)],
    room: [px(7688345), px(7688357)],
  },
  "espiga-oscura": {
    texture: [px(1080620), px(1457842), px(7688358)],
    installed: [px(7688346), px(7688359), px(6775261)],
    detail: [px(1080721), px(7688360)],
    room: [px(7688347), px(7688361)],
  },
  "piedra-beige": {
    texture: [px(7688348), px(7688362), px(1866146)],
    installed: [px(6969832), px(7688363), px(7688364)],
    detail: [px(7688365), px(6438760)],
    room: [px(7688366), px(7688367)],
  },
  "piedra-gris": {
    texture: [px(7688350), px(6438760), px(7688368)],
    installed: [px(6969851), px(7688369), px(7688370)],
    detail: [px(6438747), px(7688371)],
    room: [px(7688372), px(7688373)],
  },
  "hormigon-claro": {
    texture: [px(276582), px(276723), px(7688374)],
    installed: [px(7688352), px(1457847), px(7688375)],
    detail: [px(7688376), px(5822400)],
    room: [px(7688377), px(1866146)],
  },
  "hormigon-oscuro": {
    texture: [px(6775252), px(5822401), px(7688378)],
    installed: [px(6657647), px(7688379), px(7688380)],
    detail: [px(6775248), px(7688353)],
    room: [px(7688351), px(6969851)],
  },
  nogal: {
    texture: [px(1571468), px(1571461), px(6775261)],
    installed: [px(6775252), px(6657606), px(7688341)],
    detail: [px(1571462), px(1571467)],
    room: [px(7688342), px(7688361)],
  },
  "blanco-nordico": {
    texture: [px(1571460), px(5822399), px(7688336)],
    installed: [px(6657103), px(7688344), px(7688345)],
    detail: [px(1571463), px(6438747)],
    room: [px(271816), px(7688355)],
  },
  "negro-premium": {
    texture: [px(6775252), px(5822401), px(7688378)],
    installed: [px(6657647), px(7688359), px(7688380)],
    detail: [px(1571468), px(6775248)],
    room: [px(7688361), px(7688351)],
  },
};

/** Etiquetas para la galería de producto (orden fijo: texture → installed → detail → room) */
export const FLOOR_GALLERY_LABELS = [
  "Textura de la lama",
  "Suelo instalado",
  "Detalle de color",
  "Estancia recomendada",
] as const;

export const FLOOR_CATEGORY_LABELS: Record<VinylFloorCategory, string> = {
  "roble-claro": "Roble claro",
  "roble-medio": "Roble medio",
  "roble-oscuro": "Roble oscuro",
  "gris-claro": "Gris claro",
  "gris-medio": "Gris medio",
  "gris-oscuro": "Gris oscuro",
  "espiga-clara": "Espiga clara",
  "espiga-oscura": "Espiga oscura",
  "piedra-beige": "Piedra beige",
  "piedra-gris": "Piedra gris",
  "hormigon-claro": "Hormigón claro",
  "hormigon-oscuro": "Hormigón oscuro",
  nogal: "Nogal",
  "blanco-nordico": "Blanco nórdico",
  "negro-premium": "Negro premium",
};

/** Categorías similares para fallback — siempre otro suelo vinílico, nunca abstracto */
export const CATEGORY_FALLBACK_CHAIN: Record<
  VinylFloorCategory,
  VinylFloorCategory[]
> = {
  "roble-claro": ["roble-claro", "roble-medio", "blanco-nordico"],
  "roble-medio": ["roble-medio", "roble-claro", "roble-oscuro", "nogal"],
  "roble-oscuro": ["roble-oscuro", "roble-medio", "nogal", "negro-premium"],
  "gris-claro": ["gris-claro", "gris-medio", "blanco-nordico"],
  "gris-medio": ["gris-medio", "gris-claro", "gris-oscuro"],
  "gris-oscuro": ["gris-oscuro", "gris-medio", "hormigon-oscuro"],
  "espiga-clara": ["espiga-clara", "roble-claro", "espiga-oscura"],
  "espiga-oscura": ["espiga-oscura", "espiga-clara", "nogal"],
  "piedra-beige": ["piedra-beige", "piedra-gris", "roble-claro"],
  "piedra-gris": ["piedra-gris", "piedra-beige", "gris-medio"],
  "hormigon-claro": ["hormigon-claro", "gris-claro", "hormigon-oscuro"],
  "hormigon-oscuro": ["hormigon-oscuro", "hormigon-claro", "gris-oscuro"],
  nogal: ["nogal", "roble-oscuro", "roble-medio"],
  "blanco-nordico": ["blanco-nordico", "roble-claro", "gris-claro"],
  "negro-premium": ["negro-premium", "roble-oscuro", "gris-oscuro"],
};

export const DEFAULT_FLOOR_FALLBACK =
  VINYL_FLOOR_LIBRARY["roble-claro"].texture[0];

/** Todas las URLs únicas de la biblioteca (≥40) */
export const ALL_VINYL_FLOOR_URLS: string[] = [
  ...new Set(
    Object.values(VINYL_FLOOR_LIBRARY).flatMap((set) =>
      Object.values(set).flat(),
    ),
  ),
].filter((url) => url !== HERO_IMAGE_URL);

function hashSlug(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickFromPool(pool: string[], slug: string, offset: number): string {
  if (pool.length === 0) return DEFAULT_FLOOR_FALLBACK;
  const hash = hashSlug(slug) + offset * 31;
  return pool[hash % pool.length];
}

function pickUnique(
  pool: string[],
  slug: string,
  offset: number,
  used: string[],
): string {
  const candidates = pool.filter((u) => !used.includes(u) && u !== HERO_IMAGE_URL);
  if (candidates.length === 0) {
    return pickFromPool(pool.filter((u) => u !== HERO_IMAGE_URL), slug, offset);
  }
  return pickFromPool(candidates, slug, offset);
}

export function categoryFromUrl(src: string): VinylFloorCategory | null {
  for (const [cat, lib] of Object.entries(VINYL_FLOOR_LIBRARY)) {
    const all = Object.values(lib).flat();
    if (all.some((url) => url === src || src.startsWith(url.split("?")[0]))) {
      return cat as VinylFloorCategory;
    }
  }
  return null;
}

export function getFallbackChain(src?: string): string[] {
  const category = src ? categoryFromUrl(src) : null;
  const chain = category
    ? CATEGORY_FALLBACK_CHAIN[category]
    : (["roble-claro"] as VinylFloorCategory[]);

  const paths = chain.flatMap((c) => {
    const lib = VINYL_FLOOR_LIBRARY[c];
    return [lib.texture[0], lib.installed[0], lib.detail[0], lib.room[0]];
  });

  return [...new Set([...paths, DEFAULT_FLOOR_FALLBACK])].filter(
    (u) => u !== HERO_IMAGE_URL,
  );
}

/**
 * Resuelve la categoría visual según nombre, color, colección, tipo y acabado.
 * Prioriza el nombre del producto para tonos específicos (nogal, blanco, negro…).
 */
export function resolveImageCategory(input: {
  tipo: FloorType;
  color: ColorTone;
  sistema: FloorSystem;
  nombre: string;
  acabado: string;
  coleccion: string;
  temaColeccion?: CollectionTheme;
}): VinylFloorCategory {
  const name = input.nombre.toLowerCase();
  const acabado = input.acabado.toLowerCase();

  if (input.tipo === "espiga") {
    return input.color === "oscuro" ? "espiga-oscura" : "espiga-clara";
  }

  if (input.tipo === "piedra") {
    if (
      name.includes("beige") ||
      name.includes("caliza") ||
      name.includes("arena") ||
      name.includes("marfil") ||
      input.color === "claro"
    ) {
      return "piedra-beige";
    }
    return "piedra-gris";
  }

  if (input.tipo === "hormigon") {
    return input.color === "oscuro" ? "hormigon-oscuro" : "hormigon-claro";
  }

  if (
    name.includes("negro") ||
    name.includes("ébano") ||
    name.includes("ebano") ||
    name.includes("wenge") ||
    name.includes("antracita") ||
    (input.coleccion === "Signature" && input.color === "oscuro" && name.includes("premium"))
  ) {
    return "negro-premium";
  }

  if (
    name.includes("nogal") ||
    name.includes("walnut") ||
    name.includes("cacao") ||
    name.includes("cognac")
  ) {
    return "nogal";
  }

  if (
    name.includes("blanco") ||
    name.includes("marfil") ||
    name.includes("perla") ||
    name.includes("champagne") ||
    acabado.includes("blanco")
  ) {
    return "blanco-nordico";
  }

  if (
    name.includes("nórdico") ||
    name.includes("nordico") ||
    name.includes("escandinav")
  ) {
    if (input.color === "oscuro") return "gris-oscuro";
    return "blanco-nordico";
  }

  if (
    name.includes("gris") ||
    name.includes("grafito") ||
    name.includes("plata") ||
    name.includes("cemento") ||
    name.includes("cement")
  ) {
    if (input.color === "oscuro") return "gris-oscuro";
    if (input.color === "medio") return "gris-medio";
    return "gris-claro";
  }

  if (input.tipo === "roble") {
    if (input.color === "claro") return "roble-claro";
    if (input.color === "medio") return "roble-medio";
    return "roble-oscuro";
  }

  if (input.temaColeccion === "nordico") {
    return input.color === "oscuro" ? "gris-oscuro" : "blanco-nordico";
  }

  if (input.color === "claro") return "roble-claro";
  if (input.color === "medio") return "roble-medio";
  return "roble-oscuro";
}

/**
 * Asigna 4 imágenes semánticas por producto:
 * [0] textura → tarjeta principal
 * [1] instalado → hover tarjeta + galería
 * [2] detalle → galería
 * [3] estancia → galería
 */
export function resolveProductImages(
  slug: string,
  input: {
    tipo: FloorType;
    color: ColorTone;
    sistema: FloorSystem;
    nombre: string;
    acabado: string;
    coleccion: string;
    temaColeccion?: CollectionTheme;
  },
): { imagen: string; imagenHover: string; imagenes: string[] } {
  const category = resolveImageCategory(input);
  const lib = VINYL_FLOOR_LIBRARY[category];

  const texture = pickUnique(lib.texture, slug, 0, []);
  const installed = pickUnique(lib.installed, slug, 1, [texture]);
  const detail = pickUnique(lib.detail, slug, 2, [texture, installed]);
  const room = pickUnique(lib.room, slug, 3, [texture, installed, detail]);

  const imagenes = [texture, installed, detail, room].filter(
    (url, i, arr) => url && arr.indexOf(url) === i && url !== HERO_IMAGE_URL,
  );

  while (imagenes.length < 4) {
    const chain = CATEGORY_FALLBACK_CHAIN[category];
    const fallbackCat = chain[imagenes.length % chain.length];
    const fallbackLib = VINYL_FLOOR_LIBRARY[fallbackCat];
    const roles: FloorImageRole[] = ["texture", "installed", "detail", "room"];
    const role = roles[imagenes.length % roles.length];
    const extra = pickUnique(fallbackLib[role], slug, imagenes.length + 5, imagenes);
    if (!imagenes.includes(extra)) imagenes.push(extra);
    else break;
  }

  return {
    imagen: imagenes[0] ?? DEFAULT_FLOOR_FALLBACK,
    imagenHover: imagenes[1] ?? imagenes[0] ?? DEFAULT_FLOOR_FALLBACK,
    imagenes: imagenes.length > 0 ? imagenes : [DEFAULT_FLOOR_FALLBACK],
  };
}

/** Acepta URLs de Pexels/Unsplash o rutas locales /images/floors/ */
export function sanitizeFloorPath(path: string | undefined): string {
  if (!path) return DEFAULT_FLOOR_FALLBACK;
  if (path === HERO_IMAGE_URL || path.includes("photo-1600585154340-be6161a56a0c")) {
    return DEFAULT_FLOOR_FALLBACK;
  }
  if (
    path.startsWith("https://images.pexels.com/") ||
    path.startsWith("https://images.unsplash.com/") ||
    path.startsWith("/images/floors/")
  ) {
    return path;
  }
  return DEFAULT_FLOOR_FALLBACK;
}
