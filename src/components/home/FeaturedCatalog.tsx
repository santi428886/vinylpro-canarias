import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import CatalogProductImage from "@/components/catalog/CatalogProductImage";
import ProductFeatureBadges from "@/components/catalog/ProductFeatureBadges";
import {
  ProductRating,
  ProductAvailabilityBadges,
} from "@/components/ui/ProductTrustBadges";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { formatEuro } from "@/lib/calculator";

export default function FeaturedCatalog() {
  const products = getFeaturedProducts(6);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Catálogo"
            title="Modelos destacados"
            description="Más de 100 modelos disponibles. Material e instalación incluidos por m²."
          />
        </FadeIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border/80 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                <Link
                  href={`/modelo/${product.slug}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-neutral-100"
                >
                  <CatalogProductImage
                    slug={product.slug}
                    alt={product.nombre}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute left-4 top-4 z-10">
                    <ProductFeatureBadges product={product} />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <ProductRating />
                    <ProductAvailabilityBadges />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
                    {product.tipo} · {product.color}
                  </p>
                  <Link href={`/modelo/${product.slug}`}>
                    <h3 className="mt-2 text-lg font-semibold text-foreground transition group-hover:text-accent">
                      {product.nombre}
                    </h3>
                  </Link>
                  <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted">
                    {product.descripcion}
                  </p>
                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/80 pt-5">
                    <p className="text-xl font-semibold text-foreground">
                      {formatEuro(product.precio)}
                      <span className="text-sm font-normal text-muted">
                        {" "}
                        /m² instalado
                      </span>
                    </p>
                    <Link
                      href={`/modelo/${product.slug}`}
                      className="shrink-0 rounded-full border border-foreground/15 px-4 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-white"
                    >
                      Ver modelo
                    </Link>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <Button href="/catalogo" variant="outline" size="lg">
            Ver catálogo completo
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
