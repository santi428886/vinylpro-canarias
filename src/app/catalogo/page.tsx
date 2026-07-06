import PageHero from "@/components/ui/PageHero";
import CatalogPageContent from "@/components/catalog/CatalogPageContent";
import InspirationSection from "@/components/catalog/InspirationSection";
import BeforeAfterSection from "@/components/catalog/BeforeAfterSection";
import RealClientsGallery from "@/components/catalog/RealClientsGallery";
import { allProducts } from "@/lib/products";
import { ambientImagePath } from "@/data/ambient-images";
import { createMetadata, SITE_NAME } from "@/lib/seo";
import "./catalog.css";

export const metadata = createMetadata({
  title: `Catálogo premium de suelos vinílicos | ${SITE_NAME}`,
  description: `Explora más de ${allProducts.length} modelos de suelo vinílico PVC con instalación incluida. Compara, guarda favoritos e inspírate.`,
  path: "/catalogo",
});

export default function CatalogoPage() {
  return (
    <div data-page="catalogo">
      <PageHero
        label="Colección"
        title="Suelos vinílicos de autor"
        description="Más de 100 acabados con instalación incluida. Explora por color, estancia y formato — material premium, precio cerrado por m²."
        image={ambientImagePath("roble-miel")}
        imageAlt="Salón luminoso con suelo vinílico Roble Miel instalado"
      />
      <CatalogPageContent />
      <InspirationSection />
      <BeforeAfterSection />
      <RealClientsGallery />
    </div>
  );
}
