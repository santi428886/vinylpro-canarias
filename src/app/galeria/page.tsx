import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Galería de instalaciones | ${SITE_NAME}`,
  description:
    "Proyectos reales de suelos vinílicos en Gran Canaria. Antes y después, salones, cocinas, dormitorios y locales comerciales.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        label="Galería"
        title="Proyectos reales en Gran Canaria"
        description="Inspiración de salones, cocinas, dormitorios, locales e instalaciones antes y después."
      />
      <section className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
