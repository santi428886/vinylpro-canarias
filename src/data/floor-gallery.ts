/** Galería fotográfica — public/images/products/{slug}/ */

import {
  resolveAmbientImage,
  type AmbientSceneId,
  ambientImagePath,
} from "@/data/ambient-images";

export { ambientImagePath, type AmbientSceneId };
export {
  AMBIENT_SCENES,
  AMBIENT_SCENE_LABELS,
  resolveAmbientImage,
  resolveAmbientScene,
} from "@/data/ambient-images";

export const GALLERY_SHOTS = [
  "portada",
  "salon",
  "cocina",
  "dormitorio",
  "textura",
] as const;

export type FloorGalleryShot = (typeof GALLERY_SHOTS)[number];

export const GALLERY_LABELS: Record<FloorGalleryShot, string> = {
  portada: "Primer plano del suelo",
  salon: "Salón instalado",
  cocina: "Cocina instalada",
  dormitorio: "Dormitorio instalado",
  textura: "Detalle de la veta",
};

const EXT = "webp";
const PRODUCTS_BASE = "/images/products";

export function floorImagePath(slug: string, shot: FloorGalleryShot): string {
  return `${PRODUCTS_BASE}/${slug}/${shot}.${EXT}`;
}

export function productGalleryPaths(slug: string): Record<FloorGalleryShot, string> {
  return Object.fromEntries(
    GALLERY_SHOTS.map((shot) => [shot, floorImagePath(slug, shot)]),
  ) as Record<FloorGalleryShot, string>;
}

export function primaryFloorImage(slug: string): string {
  return resolveAmbientImage(slug) ?? floorImagePath(slug, "salon");
}

export function hoverFloorImage(slug: string): string {
  return floorImagePath(slug, "textura");
}

/** Tarjeta de catálogo: interiores con piso instalado (evita texturas sueltas) */
export function catalogCardImages(slug: string): {
  primary: string;
  hover: string;
} {
  const ambient = resolveAmbientImage(slug);
  if (ambient) {
    return {
      primary: ambient,
      hover: floorImagePath(slug, "salon"),
    };
  }
  return {
    primary: floorImagePath(slug, "salon"),
    hover: floorImagePath(slug, "cocina"),
  };
}

export const ROOM_IMAGE_BASE = "/images/rooms";

export function roomImagePath(room: string, filename?: string): string {
  return `${ROOM_IMAGE_BASE}/${room}/${filename ?? `${room}.webp`}`;
}

export const TEXTURE_IMAGE_BASE = "/images/textures";

export function textureImagePath(texture: string, filename?: string): string {
  return `${TEXTURE_IMAGE_BASE}/${texture}/${filename ?? `${texture}.webp`}`;
}
