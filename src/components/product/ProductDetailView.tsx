"use client";

import type { Product } from "@/types/product";
import { COLLECTION_LABELS } from "@/types/product";
import { buildWhatsAppUrl } from "@/lib/constants";
import { formatEuro } from "@/lib/calculator";
import { getSistemaLabel } from "@/lib/product-enrichment";
import ProductGallery from "@/components/product/ProductGallery";
import PriceCalculator from "@/components/product/PriceCalculator";
import FavoriteButton from "@/components/catalog/FavoriteButton";
import CompareToggle from "@/components/catalog/CompareToggle";
import ProductBadgeTag from "@/components/catalog/ProductBadgeTag";
import StarRating from "@/components/catalog/StarRating";
import Button from "@/components/ui/Button";

type ProductDetailViewProps = {
  product: Product;
};

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const whatsappMessage = `Hola VinylPro Canarias, me interesa el modelo "${product.nombre}" (${formatEuro(product.precio)}/m² instalado). ¿Podéis enviarme presupuesto?`;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <ProductGallery category={product.patternCategory} alt={product.nombre} />

      <div>
        <div className="flex flex-wrap items-center gap-3">
          {product.badge && <ProductBadgeTag badge={product.badge} />}
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {COLLECTION_LABELS[product.temaColeccion]}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <FavoriteButton slug={product.slug} className="!bg-surface shadow-none" />
          <CompareToggle slug={product.slug} className="!bg-surface shadow-none" />
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {product.nombre}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {product.descripcion}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-muted">
              Precio instalado
            </p>
            <p className="mt-1 text-3xl font-semibold">
              {formatEuro(product.precio)}
              <span className="text-base font-normal text-muted"> /m²</span>
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-muted">
              Solo material
            </p>
            <p className="mt-1 text-3xl font-semibold">
              {formatEuro(product.precioMaterial)}
              <span className="text-base font-normal text-muted"> /m²</span>
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border p-6">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Garantía
            </dt>
            <dd className="mt-1 text-sm font-medium">{product.garantia}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Grosor
            </dt>
            <dd className="mt-1 text-sm font-medium">{product.grosor}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Instalación
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {getSistemaLabel(product.sistema)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Resistencia
            </dt>
            <dd className="mt-1 text-sm font-medium">{product.resistencia}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Habitaciones recomendadas
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {product.habitaciones.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium"
                >
                  {h}
                </span>
              ))}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted">
              Nivel de uso
            </dt>
            <dd className="mt-1 text-sm font-medium">{product.nivelUso}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl bg-surface p-6">
          <p className="mb-4 text-sm font-semibold text-foreground">
            Indicadores de rendimiento
          </p>
          <div className="space-y-2">
            <StarRating value={product.ratings.resistencia} label="Resistencia" size="md" />
            <StarRating value={product.ratings.agua} label="Agua" size="md" />
            <StarRating value={product.ratings.mascotas} label="Mascotas" size="md" />
            <StarRating value={product.ratings.ninos} label="Niños" size="md" />
            <StarRating value={product.ratings.oficinas} label="Oficinas" size="md" />
            <StarRating value={product.ratings.calefaccion} label="Calefacción radiante" size="md" />
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {product.caracteristicas.map((c) => (
            <li key={c} className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-accent">✓</span> {c}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href={buildWhatsAppUrl(whatsappMessage)}
            variant="whatsapp"
            size="lg"
            external
            className="flex-1"
          >
            Solicitar presupuesto
          </Button>
          <Button href="/catalogo" variant="outline" size="lg">
            Ver catálogo
          </Button>
        </div>
      </div>
    </div>
  );
}
