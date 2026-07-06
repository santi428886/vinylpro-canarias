"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { COLLECTION_LABELS } from "@/types/product";
import { formatEuro } from "@/lib/calculator";
import { getSistemaLabel } from "@/lib/product-enrichment";
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
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.04, 0.4),
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]"
    >
      <Link
        href={`/modelo/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-neutral-100 sm:aspect-[3/4] lg:aspect-[4/5]"
      >
        <CatalogProductImage
          slug={product.slug}
          alt={product.nombre}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-0"
          hoverClassName="opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 z-10 max-w-[85%]">
          <ProductFeatureBadges product={product} />
        </div>

        <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <FavoriteButton slug={product.slug} />
          <CompareToggle slug={product.slug} />
        </div>

        <span className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{COLLECTION_LABELS[product.temaColeccion]}</span>
          <span className="text-border">·</span>
          <span>{getSistemaLabel(product.sistema)}</span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <ProductRating />
          <ProductAvailabilityBadges />
        </div>

        <Link href={`/modelo/${product.slug}`} className="mt-2.5 block">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-xl">
            {product.nombre}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.descripcion}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/80 pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Instalado
            </p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
              {formatEuro(product.precio)}
              <span className="text-sm font-normal text-muted"> /m²</span>
            </p>
          </div>
          <Link
            href={`/modelo/${product.slug}`}
            className="shrink-0 rounded-full border border-foreground/15 px-4 py-2 text-xs font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-white"
          >
            Ver modelo
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
