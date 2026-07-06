"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getBestSellerProducts } from "@/lib/products";
import { BEST_SELLER_ITEMS } from "@/data/catalog-visual";
import CatalogProductImage from "./CatalogProductImage";
import ProductFeatureBadges from "./ProductFeatureBadges";
import { formatEuro } from "@/lib/calculator";

export default function BestSellersSection() {
  const slugs = BEST_SELLER_ITEMS.map((item) => item.slug);
  const products = getBestSellerProducts(slugs);
  const labelBySlug = Object.fromEntries(
    BEST_SELLER_ITEMS.map((item) => [item.slug, item.label]),
  );

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="bestsellers-heading" className="mt-14 sm:mt-16">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Selección del mes
        </p>
        <h2
          id="bestsellers-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Los más vendidos
        </h2>
      </div>

      <div className="mt-6 flex gap-5 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
        {products.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="w-[300px] shrink-0 sm:w-auto"
          >
            <Link
              href={`/modelo/${product.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-border/80 transition-all duration-500 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] hover:ring-foreground/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <CatalogProductImage
                  slug={product.slug}
                  alt={labelBySlug[product.slug] ?? product.nombre}
                  sizes="(max-width: 640px) 300px, 33vw"
                  className="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <div className="absolute left-4 top-4 z-10">
                  <ProductFeatureBadges product={product} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {labelBySlug[product.slug] ?? product.nombre}
                </h3>
                <p className="mt-1 text-xs capitalize text-muted">
                  {product.tipo} · {product.color}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {formatEuro(product.precio)}
                  <span className="text-sm font-normal text-muted"> /m²</span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
