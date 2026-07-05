import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getProductBySlug,
  getSimilarProducts,
} from "@/lib/products";
import { createMetadata, productJsonLd, SITE_NAME } from "@/lib/seo";
import { formatEuro } from "@/lib/calculator";
import ProductDetailView from "@/components/product/ProductDetailView";
import PriceCalculator from "@/components/product/PriceCalculator";
import SimilarProducts from "@/components/product/SimilarProducts";
import CompareBar from "@/components/catalog/CompareBar";
import JsonLd from "@/components/seo/JsonLd";

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
    image: "/og-image.jpg",
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const similar = getSimilarProducts(product);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <section className="bg-white pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <ProductDetailView product={product} />

          <div className="mt-20 max-w-xl">
            <PriceCalculator
              precioM2={product.precio}
              productName={product.nombre}
            />
          </div>
        </div>
      </section>

      <SimilarProducts products={similar} />
      <CompareBar />
    </>
  );
}
