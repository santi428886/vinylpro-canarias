import type {
  CollectionTheme,
  FloorSystem,
  Product,
  ProductBadge,
  ProductRatings,
  PriceRange,
} from "@/types/product";
import { INSTALLATION_COST_M2 } from "@/types/product";
import { resolveProductImages } from "@/data/floor-images";

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h << 5) - h + slug.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function resolveTemaColeccion(p: Pick<Product, "tipo" | "coleccion" | "precio" | "nombre">): CollectionTheme {
  if (p.coleccion === "Signature" || p.precio >= 33) return "premium";
  if (p.tipo === "espiga") return "espiga";
  if (p.tipo === "piedra") return "piedra";
  if (p.tipo === "hormigon") return "hormigon";
  if (p.coleccion === "Industrial") return "industrial";
  if (
    p.nombre.toLowerCase().includes("gris") ||
    p.nombre.toLowerCase().includes("nórdico") ||
    p.nombre.toLowerCase().includes("nordico")
  ) {
    return "nordico";
  }
  if (p.tipo === "roble") return "roble-natural";
  return "roble-natural";
}

export function resolveBadge(
  p: Pick<Product, "slug" | "popularidad" | "coleccion" | "precio">,
): ProductBadge | null {
  if (p.popularidad >= 95) return "mas-vendido";
  if (p.coleccion === "Signature" || p.precio >= 34) return "premium";
  if (p.slug.includes("compact") || p.precio < 26) return "oferta";
  if (hashSlug(p.slug) % 9 === 0) return "nuevo";
  return null;
}

export function computeRatings(
  p: Pick<Product, "sistema" | "coleccion" | "usos" | "caracteristicas" | "precio">,
): ProductRatings {
  const isPremium = p.coleccion === "Signature" || p.precio >= 33;
  const isSpc = p.sistema === "spc-click";
  const hasRadiant = p.caracteristicas.some((c) =>
    c.toLowerCase().includes("radiante"),
  );

  return {
    resistencia: isPremium ? 5 : isSpc ? 4 : 3,
    agua: 5,
    mascotas: isSpc ? 5 : 4,
    ninos: isSpc ? 5 : 4,
    oficinas: p.usos.includes("local") ? 5 : p.sistema === "rollo" ? 3 : 4,
    calefaccion: hasRadiant ? 5 : isSpc ? 4 : 3,
  };
}

export function resolveNivelUso(
  p: Pick<Product, "sistema" | "coleccion" | "resistencia">,
): string {
  if (p.coleccion === "Signature") return "Intensivo / comercial";
  if (p.sistema === "spc-click") return "Intensivo / familiar";
  if (p.sistema === "adhesivo") return "Moderado / vivienda";
  return "Moderado / oficinas";
}

export function resolveHabitaciones(
  usos: Product["usos"],
): string[] {
  const map: Record<string, string> = {
    vivienda: "Salón & dormitorio",
    bano: "Baño",
    cocina: "Cocina",
    local: "Local comercial",
  };
  return usos.map((u) => map[u] ?? u);
}

export function resolvePriceRange(precio: number): PriceRange {
  if (precio < 27) return "economico";
  if (precio <= 32) return "medio";
  return "premium";
}

export function enrichProduct(
  p: Omit<
    Product,
    | "badge"
    | "ratings"
    | "nivelUso"
    | "habitaciones"
    | "temaColeccion"
    | "imagen"
    | "imagenHover"
    | "imagenes"
    | "precioMaterial"
  >,
): Product {
  const images = resolveProductImages(p.slug, {
    tipo: p.tipo,
    color: p.color,
    sistema: p.sistema,
    nombre: p.nombre,
    acabado: p.acabado,
    coleccion: p.coleccion,
    temaColeccion: resolveTemaColeccion(p),
  });

  const base = {
    ...p,
    imagen: images.imagen,
    imagenHover: images.imagenHover,
    imagenes: images.imagenes,
    precioMaterial: Math.max(p.precio - INSTALLATION_COST_M2, 12),
    temaColeccion: resolveTemaColeccion(p),
    badge: null as ProductBadge | null,
    ratings: { resistencia: 0, agua: 0, mascotas: 0, ninos: 0, oficinas: 0, calefaccion: 0 },
    nivelUso: "",
    habitaciones: [] as string[],
  };
  return {
    ...base,
    badge: resolveBadge(base),
    ratings: computeRatings(base),
    nivelUso: resolveNivelUso(base),
    habitaciones: resolveHabitaciones(p.usos),
  };
}

export function getSistemaLabel(sistema: FloorSystem): string {
  const labels: Record<FloorSystem, string> = {
    "spc-click": "SPC Click",
    adhesivo: "Adhesivo",
    rollo: "En rollo",
  };
  return labels[sistema];
}
