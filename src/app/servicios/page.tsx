import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { services } from "@/data/site-content";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Servicios de instalación | ${SITE_NAME}`,
  description:
    "Instalación de suelos vinílicos, nivelación, rodapiés, retirada de suelo y asesoramiento personalizado en Gran Canaria.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        label="Servicios"
        title="Todo lo que necesitas"
        description="Desde la consulta inicial hasta la instalación final. Servicio integral de suelos vinílicos PVC en Gran Canaria."
      />

      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="space-y-20">
            {services.map((service, i) => (
              <FadeIn key={service.id}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:[direction:ltr]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                  <div className="lg:[direction:ltr]">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-20 text-center">
            <Button
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              variant="whatsapp"
              size="lg"
              external
            >
              Consultar servicios
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
