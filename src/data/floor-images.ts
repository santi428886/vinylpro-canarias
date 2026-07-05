import type { CollectionTheme, ColorTone, FloorSystem, FloorType } from "@/types/product";
import { FLOOR_VARIANT_LABELS } from "@/data/floor-patterns";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * RESOLUCIÓN DE CATEGORÍAS — VinylPro Canarias
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * El catálogo NO usa fotografías externas. Cada producto se asigna a una de
 * 14 categorías de textura CSS (ver VinylFloorPattern + floor-patterns.ts).
 *
 * CÓMO CAMBIAR EN EL FUTURO:
 * 1. Ajustar colores CSS → edita src/data/floor-patterns.ts
 * 2. Nueva categoría → añádela aquí + en floor-patterns.ts + resolveImageCategory()
 * 3. Fotos reales → sustituye VinylFloorPattern por archivos en /public/images/floors/
 *
 * PROHIBIDO en catálogo: casas, cocinas, agua, plástico, objetos, decoración.
 */

/** Prefijo de token — VinylFloorPattern detecta esto y renderiza CSS */
export const TEXTURE_TOKEN_PREFIX = "vinyl-texture:";

export const DEFAULT_TEXTURE_CATEGORY = "roble-claro" as const;

/** 14 categorías comerciales → textura vinílica correspondiente */
export type VinylFloorCategory =
  | "roble-claro"
  | "roble-medio"
  | "roble-oscuro"
  | "nogal"
  | "gris-claro"
  | "gris-oscuro"
  | "espiga-clara"
  | "espiga-oscura"
  | "hormigon-claro"
  | "hormigon-oscuro"
  | "piedra-beige"
  | "piedra-gris"
  | "blanco-nordico"
  | "negro-premium";

export const FLOOR_CATEGORY_LABELS: Record<VinylFloorCategory, string> = {
  "roble-claro": "Roble claro",
  "roble-medio": "Roble medio",
  "roble-oscuro": "Roble oscuro",
  nogal: "Nogal",
  "gris-claro": "Gris claro",
  "gris-oscuro": "Gris oscuro",
  "espiga-clara": "Espiga clara",
  "espiga-oscura": "Espiga oscura",
  "hormigon-claro": "Hormigón claro",
  "hormigon-oscuro": "Hormigón oscuro",
  "piedra-beige": "Piedra beige",
  "piedra-gris": "Piedra gris",
  "blanco-nordico": "Blanco nórdico",
  "negro-premium": "Negro premium",
};

/** Etiquetas galería producto — 3 vistas CSS de la misma textura */
export const FLOOR_GALLERY_LABELS = FLOOR_VARIANT_LABELS;

const GALLERY_VARIANT_COUNT = 3;

/** Genera token interno: vinyl-texture:roble-claro:0 */
export function textureToken(
  category: VinylFloorCategory,
  variant: number,
): string {
  return `${TEXTURE_TOKEN_PREFIX}${category}:${variant % GALLERY_VARIANT_COUNT}`;
}

export const DEFAULT_FLOOR_FALLBACK = textureToken(DEFAULT_TEXTURE_CATEGORY, 0);

/** Fallback entre categorías similares */
export const CATEGORY_FALLBACK_CHAIN: Record<
  VinylFloorCategory,
  VinylFloorCategory[]
> = {
  "roble-claro": ["roble-claro", "roble-medio", "blanco-nordico"],
  "roble-medio": ["roble-medio", "roble-claro", "roble-oscuro"],
  "roble-oscuro": ["roble-oscuro", "roble-medio", "nogal"],
  nogal: ["nogal", "roble-oscuro", "espiga-oscura"],
  "gris-claro": ["gris-claro", "blanco-nordico", "hormigon-claro"],
  "gris-oscuro": ["gris-oscuro", "hormigon-oscuro", "negro-premium"],
  "espiga-clara": ["espiga-clara", "roble-claro", "espiga-oscura"],
  "espiga-oscura": ["espiga-oscura", "espiga-clara", "nogal"],
  "piedra-beige": ["piedra-beige", "piedra-gris", "roble-claro"],
  "piedra-gris": ["piedra-gris", "piedra-beige", "gris-oscuro"],
  "hormigon-claro": ["hormigon-claro", "gris-claro", "hormigon-oscuro"],
  "hormigon-oscuro": ["hormigon-oscuro", "hormigon-claro", "gris-oscuro"],
  "blanco-nordico": ["blanco-nordico", "roble-claro", "gris-claro"],
  "negro-premium": ["negro-premium", "roble-oscuro", "gris-oscuro"],
};

function hashSlug(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function parseTextureToken(
  src: string,
): { category: VinylFloorCategory; variant: number } | null {
  if (!src.startsWith(TEXTURE_TOKEN_PREFIX)) return null;
  const rest = src.slice(TEXTURE_TOKEN_PREFIX.length);
  const [cat, variantStr] = rest.split(":");
  if (!cat || !(cat in FLOOR_CATEGORY_LABELS)) return null;
  return {
    category: cat as VinylFloorCategory,
    variant: parseInt(variantStr ?? "0", 10) || 0,
  };
}

export function isTextureToken(src: string): boolean {
  return src.startsWith(TEXTURE_TOKEN_PREFIX);
}

/** Para SEO / Open Graph — las texturas CSS no tienen URL pública */
export function textureTokenToOgImage(src: string): string {
  return isTextureToken(src) ? "/og-image.jpg" : src;
}

/**
 * Asigna categoría según nombre, color, tipo, colección y acabado.
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
  const coleccion = input.coleccion.toLowerCase();

  if (input.tipo === "espiga") {
    return input.color === "oscuro" ? "espiga-oscura" : "espiga-clara";
  }

  if (input.tipo === "piedra") {
    if (
      name.includes("beige") ||
      name.includes("caliza") ||
      name.includes("arena") ||
      name.includes("marfil") ||
      name.includes("carrara") ||
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
    name.includes("wenge")
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
    acabado.includes("blanco")
  ) {
    return "blanco-nordico";
  }

  if (name.includes("nórdico") || name.includes("nordico")) {
    return input.color === "oscuro" ? "gris-oscuro" : "blanco-nordico";
  }

  if (
    name.includes("gris") ||
    name.includes("grafito") ||
    name.includes("plata") ||
    name.includes("cemento") ||
    name.includes("antracita") ||
    coleccion === "industrial"
  ) {
    return input.color === "oscuro" ? "gris-oscuro" : "gris-claro";
  }

  if (input.tipo === "roble") {
    if (input.color === "claro") return "roble-claro";
    if (input.color === "medio") return "roble-medio";
    return "roble-oscuro";
  }

  if (input.temaColeccion === "nordico") {
    return input.color === "oscuro" ? "gris-oscuro" : "blanco-nordico";
  }

  if (input.temaColeccion === "industrial") {
    return input.color === "oscuro" ? "hormigon-oscuro" : "hormigon-claro";
  }

  if (input.color === "claro") return "roble-claro";
  if (input.color === "medio") return "roble-medio";
  return "roble-oscuro";
}

/**
 * Devuelve tokens de textura CSS — sin URLs externas.
 * imagen = textura principal | imagenHover = lama | imagenes = 3 vistas
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
  const offset = hashSlug(slug) % GALLERY_VARIANT_COUNT;

  const imagenes = [0, 1, 2].map((v) =>
    textureToken(category, (offset + v) % GALLERY_VARIANT_COUNT),
  );

  return {
    imagen: imagenes[0],
    imagenHover: imagenes[1],
    imagenes,
  };
}

/** Normaliza cualquier valor legacy (URL externa o token) a token de textura válido */
export function sanitizeFloorPath(path: string | undefined): string {
  const parsed = path ? parseTextureToken(path) : null;
  if (parsed) return path!;
  return DEFAULT_FLOOR_FALLBACK;
}

export function getFallbackChain(src?: string): string[] {
  const parsed = src ? parseTextureToken(src) : null;
  const category = parsed?.category ?? DEFAULT_TEXTURE_CATEGORY;
  const chain = CATEGORY_FALLBACK_CHAIN[category];

  return [
    ...new Set(
      chain.flatMap((c) =>
        [0, 1, 2].map((v) => textureToken(c, v)),
      ),
    ),
  ];
}

export function categoryFromUrl(src: string): VinylFloorCategory | null {
  return parseTextureToken(src)?.category ?? null;
}
