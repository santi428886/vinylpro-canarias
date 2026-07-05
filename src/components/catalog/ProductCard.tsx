"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/constants";
import { formatEuro } from "@/lib/calculator";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappMessage = `Hola VinylPro Canarias, me interesa el modelo "${product.nombre}" (${formatEuro(product.precio)}/m² instalado). ¿Podéis enviarme presupuesto?`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-500 hover:shadow-xl hover:shadow-black/[0.06]"
    >
      <Link href={`/modelo/${product.slug}`} className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          loading="lazy"
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {product.coleccion}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted capitalize">
            {product.tipo}
          </span>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted capitalize">
            {product.color}
          </span>
        </div>

        <Link href={`/modelo/${product.slug}`}>
          <h3 className="mt-3 text-base font-semibold text-foreground transition hover:text-accent">
            {product.nombre}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {product.descripcion}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {product.caracteristicas.slice(0, 2).map((c) => (
            <li key={c} className="text-xs text-muted">
              ✓ {c}
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xl font-semibold text-foreground">
            {formatEuro(product.precio)}
            <span className="text-sm font-normal text-muted"> /m² instalado</span>
          </p>
        </div>

        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#20bd5a]"
        >
          Pedir este modelo
        </a>
      </div>
    </motion.article>
  );
}
