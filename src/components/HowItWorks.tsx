import { howItWorksSteps } from "@/data/catalog";
import SectionHeader from "./SectionHeader";

export default function HowItWorks() {
  return (
    <section className="bg-foreground py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Proceso"
          title="Cómo funciona"
          description="De la consulta al suelo nuevo en cuatro pasos sencillos."
          variant="light"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
