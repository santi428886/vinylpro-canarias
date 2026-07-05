import Advantages from "@/components/Advantages";
import Catalog from "@/components/Catalog";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IncludedPrice from "@/components/IncludedPrice";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <IncludedPrice />
        <Advantages />
        <HowItWorks />
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
