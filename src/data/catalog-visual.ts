import type { UsageType } from "@/types/product";
import type { VinylFloorCategory } from "@/data/floor-patterns";

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
  /** Patrón CSS del suelo protagonista */
  pattern: VinylFloorCategory;
  /** Tono de pared sugerido (CSS, no foto) */
  wallTone: string;
  /** Acento decorativo sutil */
  accentTone: string;
};

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "salon",
    label: "Salón",
    subtitle: "Suelos para el salón",
    uso: "vivienda",
    pattern: "roble-medio",
    wallTone: "#f3ede4",
    accentTone: "#d4c4a8",
  },
  {
    id: "cocina",
    label: "Cocina",
    subtitle: "Suelos para la cocina",
    uso: "cocina",
    pattern: "gris-claro",
    wallTone: "#f7f7f5",
    accentTone: "#c8ccc9",
  },
  {
    id: "dormitorio",
    label: "Dormitorio",
    subtitle: "Suelos para el dormitorio",
    uso: "vivienda",
    pattern: "roble-claro",
    wallTone: "#faf8f5",
    accentTone: "#e8dfd0",
  },
  {
    id: "bano",
    label: "Baño",
    subtitle: "Suelos para el baño",
    uso: "bano",
    pattern: "piedra-beige",
    wallTone: "#eef2f4",
    accentTone: "#d5dde2",
  },
];

export type ColorSwatch = {
  id: VisualColorId;
  label: string;
  preview: VinylFloorCategory;
  categories: VinylFloorCategory[];
};

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    id: "natural",
    label: "Natural",
    preview: "roble-medio",
    categories: ["roble-medio", "roble-claro"],
  },
  {
    id: "beige",
    label: "Beige",
    preview: "roble-claro",
    categories: ["roble-claro", "piedra-beige", "blanco-nordico"],
  },
  {
    id: "marron-oscuro",
    label: "Marrón oscuro",
    preview: "roble-oscuro",
    categories: ["roble-oscuro", "nogal"],
  },
  {
    id: "gris-claro",
    label: "Gris claro",
    preview: "gris-claro",
    categories: ["gris-claro", "blanco-nordico"],
  },
  {
    id: "gris-oscuro",
    label: "Gris oscuro",
    preview: "gris-oscuro",
    categories: ["gris-oscuro", "hormigon-oscuro"],
  },
  {
    id: "negro",
    label: "Negro",
    preview: "negro-premium",
    categories: ["negro-premium"],
  },
  {
    id: "blanco",
    label: "Blanco",
    preview: "blanco-nordico",
    categories: ["blanco-nordico", "gris-claro"],
  },
  {
    id: "roble",
    label: "Roble",
    preview: "roble-medio",
    categories: ["roble-claro", "roble-medio", "roble-oscuro"],
  },
  {
    id: "nogal",
    label: "Nogal",
    preview: "nogal",
    categories: ["nogal", "espiga-oscura"],
  },
];

/** Best sellers — slug + etiqueta comercial */
export const BEST_SELLER_ITEMS: { slug: string; label: string }[] = [
  { slug: "roble-natural-claro", label: "Roble Natural Claro" },
  { slug: "espiga-heritage-natural", label: "Espiga Roble Natural" },
  { slug: "roble-gris-nordico-plata", label: "Gris Nórdico Plata" },
  { slug: "espiga-milan-nogal", label: "Nogal Oscuro Espiga" },
  { slug: "cemento-urban-blanco", label: "Hormigón Claro" },
  { slug: "piedra-caliza-marfil", label: "Piedra Beige Marfil" },
];

export function categoriesForVisualColor(id: VisualColorId): VinylFloorCategory[] {
  return COLOR_SWATCHES.find((s) => s.id === id)?.categories ?? [];
}

export function previewForVisualColor(id: VisualColorId): VinylFloorCategory {
  return COLOR_SWATCHES.find((s) => s.id === id)?.preview ?? "roble-claro";
}
