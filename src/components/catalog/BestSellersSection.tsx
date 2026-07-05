"use client";

import Link from "next/link";
import { getBestSellerProducts } from "@/lib/products";
import { BEST_SELLER_ITEMS } from "@/data/catalog-visual";
import FloorImage from "@/components/ui/FloorImage";
import { formatEuro } from "@/lib/calculator";

export default function BestSellersSection() {
  const slugs = BEST_SELLER_ITEMS.map((item) => item.slug);
  const products = getBestSellerProducts(slugs);
  const labelBySlug = Object.fromEntries(
    BEST_SELLER_ITEMS.map((item) => [item.slug, item.label]),
  );

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="bestsellers-heading" className="mt-16 sm:mt-20">
      <h2
        id="bestsellers-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Suelos más <span className="text-accent">vendidos</span>
      </h2>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Fotografías reales de nuestros acabados más solicitados en Gran Canaria.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/modelo/${product.slug}`}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-border/80"
          >
            <div className="relative aspect-square overflow-hidden bg-surface">
              <FloorImage
                slug={product.slug}
                shot="portada"
                alt={labelBySlug[product.slug] ?? product.nombre}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
                Más vendido
              </div>
            </div>
            <div className="border-t border-border p-5">
              <h3 className="text-base font-semibold text-foreground group-hover:text-accent sm:text-lg">
                {labelBySlug[product.slug] ?? product.nombre}
              </h3>
              <p className="mt-1 text-sm text-muted capitalize">
                {product.tipo} · {product.color}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {formatEuro(product.precio)}
                <span className="text-sm font-normal text-muted"> /m² inst.</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
