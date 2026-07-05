import PageHero from "@/components/ui/PageHero";
import CatalogPageContent from "@/components/catalog/CatalogPageContent";
import { allProducts } from "@/lib/products";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Catálogo de suelos vinílicos | ${SITE_NAME}`,
  description: `Explora más de ${allProducts.length} modelos de suelo vinílico PVC con instalación incluida en Gran Canaria. Filtra por color, tipo y uso.`,
  path: "/catalogo",
});

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        label="Catálogo"
        title="Más de 100 modelos premium"
        description="Material e instalación incluidos por m². Filtra por color, tipo de diseño y uso para encontrar tu suelo ideal."
      />
      <section className="bg-surface pb-24">
        <CatalogPageContent />
      </section>
    </>
  );
}
