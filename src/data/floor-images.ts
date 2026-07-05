import type { CollectionTheme, ColorTone, FloorSystem, FloorType } from "@/types/product";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TEXTURAS DEL CATÁLOGO — VinylPro Canarias
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * El catálogo NO usa fotografías externas. Cada producto muestra una textura
 * CSS controlada que representa su tipo de suelo vinílico/PVC.
 *
 * CÓMO CAMBIAR EN EL FUTURO:
 * 1. Fotos reales → sustituye textureToken() por rutas en /public/images/floors/
 *    y adapta FloorImage.tsx para servir archivos locales.
 * 2. Ajustar colores CSS → edita TEXTURE_CONFIG en floor-texture-styles.ts
 * 3. Nueva categoría → añádela aquí + en floor-texture-styles.ts + resolveImageCategory()
 *
 * PROHIBIDO en catálogo: casas, cocinas, agua, plástico, objetos, decoración.
 */

/** Prefijo de token — FloorImage detecta esto y renderiza CSS, no <Image> */
export const TEXTURE_TOKEN_PREFIX = "vinyl-texture:";

export const DEFAULT_TEXTURE_CATEGORY = "roble-claro" as const;

/** Categorías comerciales → textura vinílica correspondiente */
export type VinylFloorCategory =
  | "roble-claro" // Roble claro — lamas madera clara
  | "roble-medio" // Roble medio — roble natural
  | "roble-oscuro" // Roble oscuro — madera oscura
  | "gris-claro" // Gris claro — vinilo gris perla
  | "gris-medio" // Gris medio — vinilo gris neutro
  | "gris-oscuro" // Gris oscuro — antracita
  | "espiga-clara" // Espiga clara — patrón herringbone claro
  | "espiga-oscura" // Espiga oscura — herringbone nogal/ébano
  | "piedra-beige" // Piedra beige — efecto caliza
  | "piedra-gris" // Piedra gris — efecto pizarra
  | "hormigon-claro" // Hormigón claro — microcemento
  | "hormigon-oscuro" // Hormigón oscuro — cemento antracita
  | "nogal" // Nogal — walnut
  | "blanco-nordico" // Blanco nórdico — roble escandinavo blanco
  | "negro-premium"; // Negro premium — wenge/ébano

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

/** Etiquetas galería producto — todas son vistas de la misma textura */
export const FLOOR_GALLERY_LABELS = [
  "Textura principal",
  "Vista de lamas",
  "Detalle de veta",
  "Variación tonal",
] as const;

/** Genera token interno: vinyl-texture:roble-claro:0 */
export function textureToken(
  category: VinylFloorCategory,
  variant: number,
): string {
  return `${TEXTURE_TOKEN_PREFIX}${category}:${variant % 4}`;
}

export const DEFAULT_FLOOR_FALLBACK = textureToken(DEFAULT_TEXTURE_CATEGORY, 0);

/** Fallback entre categorías similares (siempre otra textura de suelo) */
export const CATEGORY_FALLBACK_CHAIN: Record<
  VinylFloorCategory,
  VinylFloorCategory[]
> = {
  "roble-claro": ["roble-claro", "roble-medio", "blanco-nordico"],
  "roble-medio": ["roble-medio", "roble-claro", "roble-oscuro"],
  "roble-oscuro": ["roble-oscuro", "roble-medio", "nogal"],
  "gris-claro": ["gris-claro", "gris-medio", "blanco-nordico"],
  "gris-medio": ["gris-medio", "gris-claro", "gris-oscuro"],
  "gris-oscuro": ["gris-oscuro", "gris-medio", "hormigon-oscuro"],
  "espiga-clara": ["espiga-clara", "roble-claro", "espiga-oscura"],
  "espiga-oscura": ["espiga-oscura", "espiga-clara", "nogal"],
  "piedra-beige": ["piedra-beige", "piedra-gris", "roble-claro"],
  "piedra-gris": ["piedra-gris", "piedra-beige", "gris-medio"],
  "hormigon-claro": ["hormigon-claro", "gris-claro", "hormigon-oscuro"],
  "hormigon-oscuro": ["hormigon-oscuro", "hormigon-claro", "gris-oscuro"],
  nogal: ["nogal", "roble-oscuro", "espiga-oscura"],
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
 * Roble claro → roble-claro | Espiga → espiga | Hormigón → hormigon | etc.
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
    name.includes("antracita")
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
 * Devuelve tokens de textura CSS — sin URLs externas.
 * imagen = textura principal | imagenHover = variante | imagenes = 4 vistas
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
  const offset = hashSlug(slug) % 4;

  const imagenes = [0, 1, 2, 3].map((v) =>
    textureToken(category, (offset + v) % 4),
  );

  return {
    imagen: imagenes[0],
    imagenHover: imagenes[1],
    imagenes,
  };
}

/** Normaliza cualquier valor legacy a token de textura válido */
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
      chain.flatMap((c) => [0, 1, 2, 3].map((v) => textureToken(c, v))),
    ),
  ];
}

export function categoryFromUrl(src: string): VinylFloorCategory | null {
  return parseTextureToken(src)?.category ?? null;
}
