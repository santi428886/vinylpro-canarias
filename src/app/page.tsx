import HomeHero from "@/components/home/HomeHero";
import Benefits from "@/components/home/Benefits";
import FeaturedCatalog from "@/components/home/FeaturedCatalog";
import ProcessSection from "@/components/home/ProcessSection";
import HomeGalleryPreview from "@/components/home/HomeGalleryPreview";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Benefits />
      <FeaturedCatalog />
      <ProcessSection />
      <HomeGalleryPreview />
      <CtaSection />
    </>
  );
}
