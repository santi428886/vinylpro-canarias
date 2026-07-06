"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatEuro } from "@/lib/calculator";
import CatalogProductImage from "./CatalogProductImage";
import ProductFeatureBadges from "./ProductFeatureBadges";
import {
  ProductRating,
  ProductAvailabilityBadges,
} from "@/components/ui/ProductTrustBadges";
import FavoriteButton from "./FavoriteButton";
import CompareToggle from "./CompareToggle";

type ProductCardProps = {
  product: Product;
  index?: number;
  compact?: boolean;
};

export default function ProductCard({
  product,
  index = 0,
  compact = true,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.03, 0.3),
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-border/70 transition-shadow duration-300 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.1)]"
    >
      <Link
        href={`/modelo/${product.slug}`}
        className={`relative block overflow-hidden bg-neutral-100 ${
          compact ? "aspect-[4/3]" : "aspect-[4/5] sm:aspect-[3/4]"
        }`}
      >
        <CatalogProductImage
          slug={product.slug}
          alt={product.nombre}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-0"
          hoverClassName="opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 z-10 max-w-[90%] scale-90 origin-top-left">
          <ProductFeatureBadges product={product} />
        </div>

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <FavoriteButton slug={product.slug} />
          <CompareToggle slug={product.slug} />
        </div>
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        <p className="text-[11px] font-medium capitalize tracking-wide text-muted">
          {product.tipo} · {product.color}
        </p>

        <Link href={`/modelo/${product.slug}`} className="mt-1.5 block">
          <h3
            className={`font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent ${
              compact ? "text-base" : "text-lg sm:text-xl"
            }`}
          >
            {product.nombre}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <ProductRating className="scale-90 origin-left" />
          <ProductAvailabilityBadges className="scale-90 origin-left" />
        </div>

        <div
          className={`mt-3 flex items-end justify-between gap-3 border-t border-border/60 ${
            compact ? "pt-3" : "mt-5 pt-5"
          }`}
        >
          <p className={`font-semibold tracking-tight text-foreground ${compact ? "text-lg" : "text-2xl"}`}>
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
    </motion.article>
  );
}
