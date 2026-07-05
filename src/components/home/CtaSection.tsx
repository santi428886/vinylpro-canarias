import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export default function CtaSection() {
  return (
    <section className="bg-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            Presupuesto gratuito
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Transforma tu espacio hoy mismo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60 sm:text-lg">
            Más de 100 modelos. Instalación profesional incluida. Respuesta en
            24 horas por WhatsApp.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              variant="whatsapp"
              size="lg"
              external
            >
              Solicitar presupuesto
            </Button>
            <Button
              href="/catalogo"
              variant="outline"
              size="lg"
              className="!border-white/30 !text-white hover:!bg-white hover:!text-foreground"
            >
              Explorar catálogo
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
