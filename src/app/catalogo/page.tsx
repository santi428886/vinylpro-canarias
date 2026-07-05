import PageHero from "@/components/ui/PageHero";
import CatalogPageContent from "@/components/catalog/CatalogPageContent";
import InspirationSection from "@/components/catalog/InspirationSection";
import BeforeAfterSection from "@/components/catalog/BeforeAfterSection";
import RealClientsGallery from "@/components/catalog/RealClientsGallery";
import { allProducts } from "@/lib/products";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Catálogo premium de suelos vinílicos | ${SITE_NAME}`,
  description: `Explora más de ${allProducts.length} modelos de suelo vinílico PVC con instalación incluida. Compara, guarda favoritos e inspírate.`,
  path: "/catalogo",
});

export default function CatalogoPage() {
  return (
    <>
      <PageHero
        label="Catálogo"
        title="Más de 100 modelos premium"
        description="Material e instalación incluidos por m². Compara modelos, guarda favoritos y encuentra tu suelo ideal."
      />
      <section className="bg-surface pb-8">
        <CatalogPageContent />
      </section>
      <InspirationSection />
      <BeforeAfterSection />
      <RealClientsGallery />
    </>
  );
}
