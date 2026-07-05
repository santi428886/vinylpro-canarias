import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getProductBySlug,
  getSimilarProducts,
} from "@/lib/products";
import { createMetadata, productJsonLd, SITE_NAME } from "@/lib/seo";
import { formatEuro } from "@/lib/calculator";
import { buildWhatsAppUrl } from "@/lib/constants";
import ProductGallery from "@/components/product/ProductGallery";
import PriceCalculator from "@/components/product/PriceCalculator";
import SimilarProducts from "@/components/product/SimilarProducts";
import JsonLd from "@/components/seo/JsonLd";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return createMetadata({
    title: `${product.nombre} | ${SITE_NAME}`,
    description: `${product.descripcion} Desde ${formatEuro(product.precio)}/m² instalado en Gran Canaria.`,
    path: `/modelo/${slug}`,
    image: product.imagen,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const similar = getSimilarProducts(product);
  const whatsappMessage = `Hola VinylPro Canarias, me interesa el modelo "${product.nombre}" (${formatEuro(product.precio)}/m² instalado). ¿Podéis enviarme presupuesto?`;

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <section className="bg-white pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.imagenes} alt={product.nombre} />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {product.coleccion}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {product.nombre}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {product.descripcion}
              </p>

              <p className="mt-8 text-3xl font-semibold text-foreground">
                {formatEuro(product.precio)}
                <span className="text-base font-normal text-muted">
                  {" "}
                  /m² instalado
                </span>
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[product.tipo, product.color, product.grosor, product.acabado].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium capitalize text-muted"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-surface p-6">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                    Resistencia
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{product.resistencia}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted">
                    Garantía
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{product.garantia}</dd>
                </div>
              </dl>

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

          <div className="mt-20 max-w-xl">
            <PriceCalculator
              precioM2={product.precio}
              productName={product.nombre}
            />
          </div>
        </div>
      </section>

      <SimilarProducts products={similar} />
    </>
  );
}
