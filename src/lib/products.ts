import productSeeds from "@/data/product-seeds.json";
import type {
  Product,
  ProductFilters,
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

function expandSeeds(seeds: ProductSeed[]): Product[] {
  const products: Product[] = [];

  for (const seed of seeds) {
    for (const variant of seed.variants) {
      const nombre = `${seed.baseName} ${variant.suffix}`;
      const slug = slugify(`${seed.baseSlug}-${variant.suffix}`);

      products.push({
        id: slug,
        slug,
        nombre,
        coleccion: seed.coleccion,
        imagen: seed.imagen,
        imagenes: seed.imagenes,
        precio: seed.basePrice + (variant.priceOffset ?? 0),
        grosor: seed.grosor,
        color: variant.color,
        acabado: seed.acabado,
        resistencia: seed.resistencia,
        garantia: seed.garantia,
        descripcion: seed.descripcion,
        caracteristicas: seed.caracteristicas,
        tipo: seed.tipo,
        usos: seed.usos,
        popularidad:
          seed.basePopularity + (variant.popularityOffset ?? 0),
      });
    }
  }

  return products;
}

/** Generates XL and Compact variants to scale catalog beyond 100 models. */
function expandVariants(products: Product[]): Product[] {
  const extended = [...products];

  for (const p of products) {
    extended.push({
      ...p,
      id: `${p.id}-xl`,
      slug: `${p.slug}-xl`,
      nombre: `${p.nombre} XL`,
      precio: p.precio + 2.5,
      grosor: "8 mm",
      acabado: `${p.acabado} reforzado`,
      popularidad: p.popularidad - 8,
      descripcion: `${p.descripcion} Versión XL con mayor grosor y resistencia.`,
    });

    extended.push({
      ...p,
      id: `${p.id}-compact`,
      slug: `${p.slug}-compact`,
      nombre: `${p.nombre} Compact`,
      precio: p.precio - 1.5,
      grosor: "4 mm",
      acabado: `${p.acabado} compacto`,
      popularidad: p.popularidad - 12,
      descripcion: `${p.descripcion} Versión compacta ideal para reformas rápidas.`,
    });
  }

  return extended;
}

/** Full catalog — expand seeds to 100+ models. Add entries to product-seeds.json to grow. */
export const allProducts: Product[] = expandVariants(
  expandSeeds(productSeeds as ProductSeed[]),
);

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.tipo === product.tipo || p.coleccion === product.coleccion),
    )
    .sort((a, b) => b.popularidad - a.popularidad)
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allProducts.map((p) => p.slug);
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

  return sortProducts(result, filters.sort ?? "popularidad");
}

export function getFeaturedProducts(limit = 6): Product[] {
  return sortProducts(allProducts, "popularidad").slice(0, limit);
}

export function getCollections(): string[] {
  return [...new Set(allProducts.map((p) => p.coleccion))].sort();
}
