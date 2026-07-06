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
            description="15 modelos seleccionados. Material e instalación incluidos por m²."
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <article className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-border/70 transition-all duration-300 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.1)]">
                <Link
                  href={`/modelo/${product.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-neutral-100"
                >
                  <CatalogProductImage
                    slug={product.slug}
                    alt={product.nombre}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-3 top-3 z-10 scale-90 origin-top-left">
                    <ProductFeatureBadges product={product} />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-medium capitalize tracking-wide text-muted">
                    {product.tipo} · {product.color}
                  </p>
                  <Link href={`/modelo/${product.slug}`}>
                    <h3 className="mt-1.5 text-base font-semibold text-foreground transition group-hover:text-accent">
                      {product.nombre}
                    </h3>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <ProductRating className="scale-90 origin-left" />
                    <ProductAvailabilityBadges className="scale-90 origin-left" />
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3 border-t border-border/60 pt-3">
                    <p className="text-lg font-semibold text-foreground">
                      {formatEuro(product.precio)}
                      <span className="text-sm font-normal text-muted"> /m²</span>
                    </p>
                    <Link
                      href={`/modelo/${product.slug}`}
                      className="shrink-0 rounded-full border border-foreground/15 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-white"
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
