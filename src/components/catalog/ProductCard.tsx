"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { COLLECTION_LABELS } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/constants";
import { formatEuro } from "@/lib/calculator";
import { getSistemaLabel } from "@/lib/product-enrichment";
import VinylFloorPattern from "@/components/ui/VinylFloorPattern";
import FavoriteButton from "./FavoriteButton";
import CompareToggle from "./CompareToggle";
import ProductBadgeTag from "./ProductBadgeTag";
import StarRating from "./StarRating";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappMessage = `Hola VinylPro Canarias, me interesa el modelo "${product.nombre}" (${formatEuro(product.precio)}/m² instalado). ¿Podéis enviarme presupuesto?`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] hover:ring-border sm:min-h-[540px]"
    >
      <Link
        href={`/modelo/${product.slug}`}
        className="relative flex-[7] min-h-0 overflow-hidden bg-surface"
      >
        <VinylFloorPattern
          category={product.patternCategory}
          role="installed"
          alt={product.nombre}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-0"
        />
        <VinylFloorPattern
          category={product.patternCategory}
          role="texture"
          alt=""
          className="object-cover opacity-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          {product.badge && <ProductBadgeTag badge={product.badge} />}
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
            {COLLECTION_LABELS[product.temaColeccion]}
          </span>
        </div>

        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          <FavoriteButton slug={product.slug} />
          <CompareToggle slug={product.slug} />
        </div>
      </Link>

      <div className="flex flex-[3] flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">
            {getSistemaLabel(product.sistema)}
          </span>
          <span className="rounded-full bg-surface px-3 py-1 text-xs capitalize text-muted">
            {product.color}
          </span>
        </div>

        <Link href={`/modelo/${product.slug}`}>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground transition group-hover:text-accent sm:text-2xl">
            {product.nombre}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-2 sm:text-base">
          {product.descripcion}
        </p>

        <div className="mt-4 space-y-1">
          <StarRating value={product.ratings.resistencia} label="Resistencia" />
          <StarRating value={product.ratings.agua} label="Agua" />
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="text-xs uppercase tracking-wider text-muted">Instalado</p>
          <p className="text-2xl font-semibold text-foreground sm:text-3xl">
            {formatEuro(product.precio)}
            <span className="text-sm font-normal text-muted"> /m²</span>
          </p>
          <p className="mt-1 text-xs text-muted">
            Material: {formatEuro(product.precioMaterial)}/m²
          </p>
        </div>

        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-white transition hover:bg-foreground/90"
        >
          Pedir este modelo
        </a>
      </div>
    </motion.article>
  );
}
