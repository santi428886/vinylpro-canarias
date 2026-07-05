import HomeHero from "@/components/home/HomeHero";
import FloorTypeSelector from "@/components/home/v3/FloorTypeSelector";
import FloorComparison from "@/components/home/v3/FloorComparison";
import WorkTimeline from "@/components/home/v3/WorkTimeline";
import InstallationIncludes from "@/components/home/v3/InstallationIncludes";
import WhyVinylPro from "@/components/home/v3/WhyVinylPro";
import FaqSection from "@/components/home/v3/FaqSection";
import Benefits from "@/components/home/Benefits";
import FeaturedCatalog from "@/components/home/FeaturedCatalog";
import ProcessSection from "@/components/home/ProcessSection";
import HomeGalleryPreview from "@/components/home/HomeGalleryPreview";
import FloorPriceCalculatorSection from "@/components/home/FloorPriceCalculatorSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FloorTypeSelector />
      <FloorComparison />
      <WorkTimeline />
      <InstallationIncludes />
      <WhyVinylPro />
      <FaqSection />
      <Benefits />
      <FeaturedCatalog />
      <ProcessSection />
      <HomeGalleryPreview />
      <FloorPriceCalculatorSection />
      <CtaSection />
    </>
  );
}
