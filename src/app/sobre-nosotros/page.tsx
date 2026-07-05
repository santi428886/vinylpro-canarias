import PageHero from "@/components/ui/PageHero";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { aboutContent } from "@/data/site-content";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Sobre nosotros | ${SITE_NAME}`,
  description:
    "Conoce VinylPro Canarias. Especialistas en instalación de suelos vinílicos PVC premium en Gran Canaria con garantía y compromiso.",
  path: "/sobre-nosotros",
});

export default function SobreNosotrosPage() {
  const sections = [
    aboutContent.historia,
    aboutContent.compromiso,
    aboutContent.garantia,
  ];

  return (
    <>
      <PageHero
        label="Sobre nosotros"
        title="Calidad europea en Gran Canaria"
        description="Especialistas en suelos vinílicos PVC con instalación profesional, garantía y atención personalizada."
      />

      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl space-y-16">
            {sections.map((section) => (
              <FadeIn key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {section.text}
                </p>
              </FadeIn>
            ))}

            <FadeIn>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {aboutContent.proceso.title}
              </h2>
              <ol className="mt-6 space-y-4">
                {aboutContent.proceso.steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-base text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </div>

          <FadeIn className="mt-20 text-center">
            <Button
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              variant="primary"
              size="lg"
              external
            >
              Hablemos de tu proyecto
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
