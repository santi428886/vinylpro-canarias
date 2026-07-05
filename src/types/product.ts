import type { VinylFloorCategory } from "@/data/floor-patterns";
import type { VisualColorId } from "@/data/catalog-visual";

export type ColorTone = "claro" | "medio" | "oscuro";

export type FloorType = "roble" | "espiga" | "piedra" | "hormigon";

export type FloorSystem = "spc-click" | "adhesivo" | "rollo";

export type UsageType = "vivienda" | "bano" | "cocina" | "local";

export type SortOption = "precio" | "nombre" | "popularidad";

export type ProductBadge = "nuevo" | "premium" | "mas-vendido" | "oferta";

export type CollectionTheme =
  | "roble-natural"
  | "nordico"
  | "espiga"
  | "industrial"
  | "piedra"
  | "hormigon"
  | "premium";

export type PriceRange = "economico" | "medio" | "premium";

export type ProductRatings = {
  resistencia: number;
  agua: number;
  mascotas: number;
  ninos: number;
  oficinas: number;
  calefaccion: number;
};

export type Product = {
  id: string;
  slug: string;
  nombre: string;
  coleccion: string;
  temaColeccion: CollectionTheme;
  patternCategory: VinylFloorCategory;
  precio: number;
  precioMaterial: number;
  grosor: string;
  color: ColorTone;
  acabado: string;
  resistencia: string;
  garantia: string;
  descripcion: string;
  caracteristicas: string[];
  tipo: FloorType;
  sistema: FloorSystem;
  usos: UsageType[];
  popularidad: number;
  badge: ProductBadge | null;
  ratings: ProductRatings;
  nivelUso: string;
  habitaciones: string[];
};

export type ProductFilters = {
  color?: ColorTone[];
  tipo?: FloorType[];
  uso?: UsageType[];
  sistema?: FloorSystem[];
  coleccion?: CollectionTheme[];
  acabado?: string[];
  precioRange?: PriceRange[];
  patternCategory?: VinylFloorCategory[];
  visualColor?: VisualColorId | null;
  room?: import("@/data/catalog-visual").RoomId | null;
  sort?: SortOption;
};

export type ProductSeed = Omit<
  Product,
  | "id"
  | "slug"
  | "nombre"
  | "color"
  | "precio"
  | "precioMaterial"
  | "popularidad"
  | "sistema"
  | "badge"
  | "ratings"
  | "nivelUso"
  | "habitaciones"
  | "temaColeccion"
  | "patternCategory"
> & {
  baseName: string;
  baseSlug: string;
  basePrice: number;
  basePopularity: number;
  sistema?: FloorSystem;
  variants: Array<{
    suffix: string;
    color: ColorTone;
    priceOffset?: number;
    popularityOffset?: number;
  }>;
};

export const COLLECTION_LABELS: Record<CollectionTheme, string> = {
  "roble-natural": "Roble Natural",
  nordico: "Nórdico",
  espiga: "Espiga",
  industrial: "Industrial",
  piedra: "Piedra",
  hormigon: "Hormigón",
  premium: "Premium",
};

export const BADGE_LABELS: Record<ProductBadge, string> = {
  nuevo: "Nuevo",
  premium: "Premium",
  "mas-vendido": "Más vendido",
  oferta: "Oferta",
};

export const INSTALLATION_COST_M2 = 6.5;
