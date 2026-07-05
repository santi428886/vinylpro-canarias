import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import GranCanariaMap from "@/components/contact/GranCanariaMap";
import Button from "@/components/ui/Button";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";
import { createMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata({
  title: `Contacto | ${SITE_NAME}`,
  description:
    "Contacta con VinylPro Canarias para presupuesto gratuito de suelos vinílicos PVC. WhatsApp, formulario y servicio en toda Gran Canaria.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        label="Contacto"
        title="Hablemos de tu proyecto"
        description="Presupuesto gratuito en 24 horas. Cuéntanos tu espacio y te asesoramos sin compromiso."
      />

      <section className="bg-surface pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-xl font-semibold">Formulario de contacto</h2>
              <p className="mt-2 text-sm text-muted">
                Rellena el formulario y te redirigiremos a WhatsApp con tus
                datos.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>

              <div className="mt-10 rounded-2xl bg-white p-6">
                <p className="text-sm font-medium">¿Prefieres WhatsApp directo?</p>
                <div className="mt-4">
                  <Button
                    href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                    variant="whatsapp"
                    size="lg"
                    external
                    className="w-full"
                  >
                    Pedir presupuesto por WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Zona de servicio</h2>
              <p className="mt-2 text-sm text-muted">
                Instalamos en toda Gran Canaria y alrededores.
              </p>
              <div className="mt-8">
                <GranCanariaMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
