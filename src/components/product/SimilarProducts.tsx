import Link from "next/link";
import type { Product } from "@/types/product";
import { formatEuro } from "@/lib/calculator";
import FloorImage from "@/components/ui/FloorImage";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

type SimilarProductsProps = {
  products: Product[];
};

export default function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Relacionados"
            title="Modelos similares"
            description="Otros suelos que podrían interesarte."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
              <Link
                href={`/modelo/${product.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white transition hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-surface">
                  <FloorImage
                    src={product.imagen}
                    alt={product.nombre}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent">
                    {product.nombre}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {formatEuro(product.precio)}/m²
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
