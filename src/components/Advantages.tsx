import { advantages } from "@/data/catalog";
import SectionHeader from "./SectionHeader";

export default function Advantages() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Ventajas"
          title="Por qué elegir suelo vinílico"
          description="La opción inteligente para renovar sin complicaciones en Gran Canaria."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/30 hover:shadow-md"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
