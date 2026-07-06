import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

const steps = [
  {
    num: "01",
    title: "Envía fotos y metros",
    text: "Comparte imágenes del espacio y metros aproximados por WhatsApp.",
  },
  {
    num: "02",
    title: "Recibe recomendación",
    text: "Te proponemos modelos y presupuesto personalizado en 24 horas.",
  },
  {
    num: "03",
    title: "Coordinamos instalación",
    text: "Agendamos visita técnica si hace falta y fijamos fecha de instalación.",
  },
  {
    num: "04",
    title: "Estrena tu suelo",
    text: "Disfruta de un acabado profesional con garantía incluida.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Proceso"
            title="Simple. Rápido. Profesional."
            description="Cuatro pasos para transformar cualquier espacio sin obras complicadas."
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="rounded-2xl bg-white p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5">
                <span className="text-4xl font-light text-accent/30">{step.num}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <Button href="/contacto" variant="primary" size="lg">
            Empezar ahora
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
