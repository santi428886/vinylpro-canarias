import productSeeds from "@/data/product-seeds.json";
import { enrichProduct } from "@/lib/product-enrichment";
import { resolvePriceRange } from "@/lib/product-enrichment";
import type {
  FloorSystem,
  Product,
  ProductFilters,
  ProductFormat,
  ProductSeed,
  SortOption,
} from "@/types/product";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveSistema(seed: ProductSeed): FloorSystem {
  if (seed.sistema) return seed.sistema;
  if (
    seed.baseSlug.includes("hormigon") ||
    seed.baseSlug.includes("cemento")
  ) {
    return "rollo";
  }
  if (seed.tipo === "piedra" && seed.baseSlug.includes("slate")) {
    return "adhesivo";
  }
  return "spc-click";
}

function expandSeeds(seeds: ProductSeed[]): Product[] {
  const products: Product[] = [];

  for (const seed of seeds) {
    const sistema = resolveSistema(seed);

    for (const variant of seed.variants) {
      const nombre = `${seed.baseName} ${variant.suffix}`;
      const slug = slugify(`${seed.baseSlug}-${variant.suffix}`);

      products.push(
        enrichProduct({
          id: slug,
          slug,
          nombre,
          coleccion: seed.coleccion,
          precio: seed.basePrice + (variant.priceOffset ?? 0),
          grosor: seed.grosor,
          color: variant.color,
          acabado: seed.acabado,
          resistencia: seed.resistencia,
          garantia: seed.garantia,
          descripcion: seed.descripcion,
          caracteristicas: seed.caracteristicas,
          tipo: seed.tipo,
          sistema,
          usos: seed.usos,
          popularidad:
            seed.basePopularity + (variant.popularityOffset ?? 0),
        }),
      );
    }
  }

  return products;
}

function productCore(
  p: Product,
): Omit<
  Product,
  | "badge"
  | "ratings"
  | "nivelUso"
  | "habitaciones"
  | "temaColeccion"
  | "patternCategory"
  | "precioMaterial"
> {
  const {
    badge: _badge,
    ratings: _ratings,
    nivelUso: _nivelUso,
    habitaciones: _habitaciones,
    temaColeccion: _tema,
    patternCategory: _pattern,
    precioMaterial: _material,
    ...core
  } = p;
  return core;
}

function expandVariants(products: Product[]): Product[] {
  const extended = [...products];

  for (const p of products) {
    extended.push(
      enrichProduct({
        ...productCore(p),
        id: `${p.id}-xl`,
        slug: `${p.slug}-xl`,
        nombre: `${p.nombre} XL`,
        precio: p.precio + 2.5,
        grosor: "8 mm",
        acabado: `${p.acabado} reforzado`,
        sistema: p.sistema === "adhesivo" ? "spc-click" : p.sistema,
        popularidad: p.popularidad - 8,
        descripcion: `${p.descripcion} Versión XL con mayor grosor y resistencia.`,
      }),
    );

    extended.push(
      enrichProduct({
        ...productCore(p),
        id: `${p.id}-compact`,
        slug: `${p.slug}-compact`,
        nombre: `${p.nombre} Compact`,
        precio: p.precio - 1.5,
        grosor: "2.5 mm",
        acabado: `${p.acabado} compacto`,
        sistema: "adhesivo",
        popularidad: p.popularidad - 12,
        descripcion: `${p.descripcion} Versión compacta ideal para reformas rápidas.`,
      }),
    );
  }

  return extended;
}

export const allProducts: Product[] = expandVariants(
  expandSeeds(productSeeds as ProductSeed[]),
);

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.tipo === product.tipo || p.temaColeccion === product.temaColeccion),
    )
    .sort((a, b) => b.popularidad - a.popularidad)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}

export function getUniqueAcabados(): string[] {
  return [...new Set(allProducts.map((p) => p.acabado))].sort();
}

export function getProductFormat(slug: string): ProductFormat {
  if (slug.endsWith("-xl")) return "xl";
  if (slug.endsWith("-compact")) return "compact";
  return "estandar";
}

function matchesSearch(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    product.nombre,
    product.slug,
    product.tipo,
    product.coleccion,
    product.acabado,
    product.descripcion,
    product.temaColeccion,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "precio":
      return sorted.sort((a, b) => a.precio - b.precio);
    case "nombre":
      return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    case "popularidad":
    default:
      return sorted.sort((a, b) => b.popularidad - a.popularidad);
  }
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  let result = [...products];

  if (filters.color?.length) {
    result = result.filter((p) => filters.color!.includes(p.color));
  }
  if (filters.tipo?.length) {
    result = result.filter((p) => filters.tipo!.includes(p.tipo));
  }
  if (filters.uso?.length) {
    result = result.filter((p) =>
      p.usos.some((u) => filters.uso!.includes(u)),
    );
  }
  if (filters.sistema?.length) {
    result = result.filter((p) => filters.sistema!.includes(p.sistema));
  }
  if (filters.coleccion?.length) {
    result = result.filter((p) =>
      filters.coleccion!.includes(p.temaColeccion),
    );
  }
  if (filters.acabado?.length) {
    result = result.filter((p) => filters.acabado!.includes(p.acabado));
  }
  if (filters.precioRange?.length) {
    result = result.filter((p) =>
      filters.precioRange!.includes(resolvePriceRange(p.precio)),
    );
  }
  if (filters.patternCategory?.length) {
    result = result.filter((p) =>
      filters.patternCategory!.includes(p.patternCategory),
    );
  }
  if (filters.formato?.length) {
    result = result.filter((p) =>
      filters.formato!.includes(getProductFormat(p.slug)),
    );
  }
  if (filters.search?.trim()) {
    result = result.filter((p) => matchesSearch(p, filters.search!));
  }

  return sortProducts(result, filters.sort ?? "popularidad");
}

export function getBestSellerProducts(
  slugs: string[],
): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return sortProducts(allProducts, "popularidad").slice(0, limit);
}

export function getFavoriteProducts(slugs: string[]): Product[] {
  return getProductsBySlugs(slugs);
}
