export type ColorTone = "claro" | "medio" | "oscuro";

export type FloorType = "roble" | "espiga" | "piedra" | "hormigon";

export type UsageType = "vivienda" | "bano" | "cocina" | "local";

export type SortOption = "precio" | "nombre" | "popularidad";

export type Product = {
  id: string;
  slug: string;
  nombre: string;
  coleccion: string;
  imagen: string;
  imagenes: string[];
  precio: number;
  grosor: string;
  color: ColorTone;
  acabado: string;
  resistencia: string;
  garantia: string;
  descripcion: string;
  caracteristicas: string[];
  tipo: FloorType;
  usos: UsageType[];
  popularidad: number;
};

export type ProductFilters = {
  color?: ColorTone[];
  tipo?: FloorType[];
  uso?: UsageType[];
  sort?: SortOption;
};

export type ProductSeed = Omit<Product, "id" | "slug" | "nombre" | "color" | "precio" | "popularidad"> & {
  baseName: string;
  baseSlug: string;
  basePrice: number;
  basePopularity: number;
  variants: Array<{
    suffix: string;
    color: ColorTone;
    priceOffset?: number;
    popularityOffset?: number;
  }>;
};
