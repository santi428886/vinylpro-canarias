import type { UsageType } from "@/types/product";
import type { VinylFloorCategory } from "@/data/floor-patterns";

export type TextureFamily =
  | "roble"
  | "nogal"
  | "gris"
  | "cemento"
  | "piedra"
  | "espiga";

/** Colores visuales estilo Quick-Step */
export type VisualColorId =
  | "natural"
  | "beige"
  | "marron-oscuro"
  | "gris-claro"
  | "gris-oscuro"
  | "negro"
  | "blanco"
  | "roble"
  | "nogal";

export type RoomId = "salon" | "cocina" | "dormitorio" | "bano";

export type RoomOption = {
  id: RoomId;
  label: string;
  subtitle: string;
  uso: UsageType;
};

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "salon",
    label: "Salón",
    subtitle: "Suelos para el salón",
    uso: "vivienda",
  },
  {
    id: "cocina",
    label: "Cocina",
    subtitle: "Suelos para la cocina",
    uso: "cocina",
  },
  {
    id: "dormitorio",
    label: "Dormitorio",
    subtitle: "Suelos para el dormitorio",
    uso: "vivienda",
  },
  {
    id: "bano",
    label: "Baño",
    subtitle: "Suelos para el baño",
    uso: "bano",
  },
];

export type ColorSwatch = {
  id: VisualColorId;
  label: string;
  previewTexture: TextureFamily;
  categories: VinylFloorCategory[];
};

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    id: "natural",
    label: "Natural",
    previewTexture: "roble",
    categories: ["roble-medio", "roble-claro"],
  },
  {
    id: "beige",
    label: "Beige",
    previewTexture: "piedra",
    categories: ["roble-claro", "piedra-beige", "blanco-nordico"],
  },
  {
    id: "marron-oscuro",
    label: "Marrón oscuro",
    previewTexture: "nogal",
    categories: ["roble-oscuro", "nogal"],
  },
  {
    id: "gris-claro",
    label: "Gris claro",
    previewTexture: "gris",
    categories: ["gris-claro", "blanco-nordico"],
  },
  {
    id: "gris-oscuro",
    label: "Gris oscuro",
    previewTexture: "cemento",
    categories: ["gris-oscuro", "hormigon-oscuro"],
  },
  {
    id: "negro",
    label: "Negro",
    previewTexture: "nogal",
    categories: ["negro-premium"],
  },
  {
    id: "blanco",
    label: "Blanco",
    previewTexture: "cemento",
    categories: ["blanco-nordico", "gris-claro"],
  },
  {
    id: "roble",
    label: "Roble",
    previewTexture: "roble",
    categories: ["roble-claro", "roble-medio", "roble-oscuro"],
  },
  {
    id: "nogal",
    label: "Nogal",
    previewTexture: "nogal",
    categories: ["nogal", "espiga-oscura"],
  },
];

/** Best sellers — slug + etiqueta comercial */
export const BEST_SELLER_ITEMS: { slug: string; label: string }[] = [
  { slug: "roble-natural-claro", label: "Roble Natural Claro" },
  { slug: "espiga-heritage-natural", label: "Espiga Roble Natural" },
  { slug: "roble-gris-nordico-plata", label: "Gris Nórdico Plata" },
];

export function categoriesForVisualColor(id: VisualColorId): VinylFloorCategory[] {
  return COLOR_SWATCHES.find((s) => s.id === id)?.categories ?? [];
}
