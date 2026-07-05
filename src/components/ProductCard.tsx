import Image from "next/image";
import type { FloorProduct } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/lib/constants";

type ProductCardProps = {
  product: FloorProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hola VinylPro Canarias, me interesa el modelo "${product.name}" (${product.price.toFixed(2).replace(".", ",")} €/m² instalado). ¿Podéis enviarme presupuesto?`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
          {product.type}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          <li className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
            Resistente al agua
          </li>
          <li className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
            Fácil limpieza
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Precio instalado
            </p>
            <p className="text-2xl font-bold text-accent">
              desde {product.price.toFixed(2).replace(".", ",")}{" "}
              <span className="text-base font-semibold text-foreground/70">
                €/m² instalado
              </span>
            </p>
          </div>
        </div>

        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-white transition hover:bg-foreground/85"
        >
          Pedir este modelo
        </a>
      </div>
    </article>
  );
}
