/** Fotografías de ambiente — public/images/rooms/ambient/ */

export const AMBIENT_SCENES = [
  "gris-claro-premium",
  "gris-nordico",
  "roble-natural",
  "roble-miel",
  "beige-arena",
  "roble-oscuro",
] as const;

export type AmbientSceneId = (typeof AMBIENT_SCENES)[number];

export const AMBIENT_SCENE_LABELS: Record<AmbientSceneId, string> = {
  "gris-claro-premium": "Gris Claro Premium",
  "gris-nordico": "Gris Nórdico",
  "roble-natural": "Roble Natural",
  "roble-miel": "Roble Miel",
  "beige-arena": "Beige Arena",
  "roble-oscuro": "Roble Oscuro",
};

const AMBIENT_BASE = "/images/rooms/ambient";

export function ambientImagePath(scene: AmbientSceneId): string {
  return `${AMBIENT_BASE}/${scene}.webp`;
}

/** Slug base sin sufijos -xl / -compact */
export function baseProductSlug(slug: string): string {
  return slug.replace(/-(xl|compact)$/, "");
}

/** Modelo → escena de ambiente (fotografía de vivienda real) */
export const PRODUCT_AMBIENT_SCENE: Partial<Record<string, AmbientSceneId>> = {
  "roble-natural-claro": "roble-natural",
  "roble-natural-arena": "beige-arena",
  "roble-natural-noche": "roble-oscuro",
  "roble-gris-nordico-plata": "gris-nordico",
  "roble-gris-nordico-grafito": "gris-claro-premium",
  "roble-gris-nordico-antracita": "gris-nordico",
  "espiga-heritage-natural": "roble-natural",
  "espiga-milan-nogal": "roble-oscuro",
  "cemento-urban-blanco": "gris-claro-premium",
  "piedra-caliza-marfil": "beige-arena",
  "hormigon-loft-claro": "gris-claro-premium",
  "roble-rustico-natural": "roble-miel",
  "roble-rustico-tostado": "roble-miel",
};

export function resolveAmbientScene(slug: string): AmbientSceneId | null {
  const base = baseProductSlug(slug);
  return PRODUCT_AMBIENT_SCENE[base] ?? null;
}

export function resolveAmbientImage(slug: string): string | null {
  const scene = resolveAmbientScene(slug);
  return scene ? ambientImagePath(scene) : null;
}
