import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import FloorImage from "@/components/ui/FloorImage";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { formatEuro } from "@/lib/calculator";

export default function FeaturedCatalog() {
  const products = getFeaturedProducts(6);

  return (
    <section className="bg-white py-24 sm:py-32">
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
              <Link
                href={`/modelo/${product.slug}`}
                className="group block overflow-hidden rounded-2xl bg-surface transition-all duration-500 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <FloorImage
                    slug={product.slug}
                    shot="portada"
                    alt={product.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                    {product.coleccion}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {product.tipo} · {product.color}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground transition group-hover:text-accent">
                    {product.nombre}
                  </h3>
                  <p className="mt-3 text-sm text-muted line-clamp-2">
                    {product.descripcion}
                  </p>
                  <p className="mt-4 text-xl font-semibold text-foreground">
                    {formatEuro(product.precio)}
                    <span className="text-sm font-normal text-muted"> /m² instalado</span>
                  </p>
                </div>
              </Link>
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
