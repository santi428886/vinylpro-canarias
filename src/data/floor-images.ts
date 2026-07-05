import type { CollectionTheme, ColorTone, FloorSystem, FloorType } from "@/types/product";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TEXTURAS DEL CATÁLOGO — VinylPro Canarias
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * SOLO tokens CSS vinyl-texture:{categoría}:{rol}. Cero URLs externas.
 *
 * Roles de galería (máx. 3):
 *   installed → suelo instalado (principal)
 *   texture   → textura de lamas
 *   detail    → detalle de veta / patrón
 *
 * CÓMO CAMBIAR: floor-patterns.ts (CSS) · fotos reales → VALIDATED_FLOOR_IMAGES
 * PROHIBIDO: casas, agua, plástico, interiores sin suelo, decoración.
 */

export const TEXTURE_TOKEN_PREFIX = "vinyl-texture:";

export const DEFAULT_TEXTURE_CATEGORY = "roble-claro" as const;

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

export type FloorGalleryRole = "installed" | "texture" | "detail";

export const GALLERY_ROLES: FloorGalleryRole[] = [
  "installed",
  "texture",
  "detail",
];

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

export const FLOOR_GALLERY_LABELS: Record<FloorGalleryRole, string> = {
  installed: "Suelo instalado",
  texture: "Textura del suelo",
  detail: "Detalle de lama",
};

export function textureToken(
  category: VinylFloorCategory,
  role: FloorGalleryRole,
): string {
  return `${TEXTURE_TOKEN_PREFIX}${category}:${role}`;
}

/**
 * Lista manual validada — únicas referencias permitidas en catálogo.
 * Añade aquí rutas /public/images/floors/ cuando tengas fotos de fabricante.
 */
export const VALIDATED_FLOOR_IMAGES: readonly string[] = (
  Object.keys(FLOOR_CATEGORY_LABELS) as VinylFloorCategory[]
).flatMap((category) =>
  GALLERY_ROLES.map((role) => textureToken(category, role)),
);

const BLOCKED_URL_PATTERNS = [
  "unsplash.com",
  "pexels.com",
  "images.unsplash",
  "images.pexels",
  "istockphoto",
  "http://",
  "https://",
] as const;

const LEGACY_VARIANT_TO_ROLE: Record<string, FloorGalleryRole> = {
  "0": "installed",
  "1": "texture",
  "2": "detail",
};

export const DEFAULT_FLOOR_FALLBACK = textureToken(
  DEFAULT_TEXTURE_CATEGORY,
  "installed",
);

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

function isBlockedExternalUrl(src: string): boolean {
  const lower = src.toLowerCase();
  return BLOCKED_URL_PATTERNS.some((p) => lower.includes(p));
}

export function parseTextureToken(src: string): {
  category: VinylFloorCategory;
  role: FloorGalleryRole;
} | null {
  if (!src.startsWith(TEXTURE_TOKEN_PREFIX)) return null;
  const rest = src.slice(TEXTURE_TOKEN_PREFIX.length);
  const [cat, roleStr] = rest.split(":");
  if (!cat || !(cat in FLOOR_CATEGORY_LABELS)) return null;

  let role: FloorGalleryRole;
  if (roleStr === "installed" || roleStr === "texture" || roleStr === "detail") {
    role = roleStr;
  } else if (roleStr && roleStr in LEGACY_VARIANT_TO_ROLE) {
    role = LEGACY_VARIANT_TO_ROLE[roleStr];
  } else {
    role = "installed";
  }

  return { category: cat as VinylFloorCategory, role };
}

/** Valida imagen de suelo — rechaza URLs externas y tokens no listados */
export function isValidFloorImage(src: string | undefined): boolean {
  if (!src || isBlockedExternalUrl(src)) return false;
  if (!src.startsWith(TEXTURE_TOKEN_PREFIX)) return false;
  if (!VALIDATED_FLOOR_IMAGES.includes(src)) return false;
  return parseTextureToken(src) !== null;
}

export function isTextureToken(src: string): boolean {
  return isValidFloorImage(src);
}

export function filterValidFloorImages(images: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const img of images) {
    if (!isValidFloorImage(img) || seen.has(img)) continue;
    seen.add(img);
    result.push(img);
    if (result.length >= 3) break;
  }

  return result;
}

export function textureTokenToOgImage(_src: string): string {
  return "/og-image.jpg";
}

export function getGalleryLabel(src: string): string {
  const parsed = parseTextureToken(src);
  if (!parsed) return FLOOR_GALLERY_LABELS.installed;
  return FLOOR_GALLERY_LABELS[parsed.role];
}

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

/** Galería: installed (principal) + texture + detail opcional */
export function resolveProductImages(
  _slug: string,
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

  const imagenes = filterValidFloorImages([
    textureToken(category, "installed"),
    textureToken(category, "texture"),
    textureToken(category, "detail"),
  ]);

  const imagen = imagenes[0] ?? DEFAULT_FLOOR_FALLBACK;
  const imagenHover = imagenes[1] ?? imagen;

  return { imagen, imagenHover, imagenes };
}

export function sanitizeFloorPath(path: string | undefined): string {
  if (isValidFloorImage(path)) return path!;
  return DEFAULT_FLOOR_FALLBACK;
}

export function getFallbackChain(src?: string): string[] {
  const parsed = src ? parseTextureToken(src) : null;
  const category = parsed?.category ?? DEFAULT_TEXTURE_CATEGORY;
  const chain = CATEGORY_FALLBACK_CHAIN[category];

  return [
    ...new Set(
      chain.flatMap((c) =>
        GALLERY_ROLES.map((role) => textureToken(c, role)),
      ),
    ),
  ];
}

export function categoryFromUrl(src: string): VinylFloorCategory | null {
  return parseTextureToken(src)?.category ?? null;
}
