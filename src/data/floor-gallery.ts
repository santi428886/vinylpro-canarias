/** Galería fotográfica — public/images/products/{slug}/ */

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
  return floorImagePath(slug, "portada");
}

export function hoverFloorImage(slug: string): string {
  return floorImagePath(slug, "salon");
}

export const ROOM_IMAGE_BASE = "/images/rooms";

export function roomImagePath(room: string, filename?: string): string {
  return `${ROOM_IMAGE_BASE}/${room}/${filename ?? `${room}.webp`}`;
}

export const TEXTURE_IMAGE_BASE = "/images/textures";

export function textureImagePath(texture: string, filename?: string): string {
  return `${TEXTURE_IMAGE_BASE}/${texture}/${filename ?? `${texture}.webp`}`;
}
