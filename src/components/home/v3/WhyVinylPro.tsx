import { Check } from "lucide-react";
import { whyVinylPro } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function WhyVinylPro() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="VinylPro Canarias"
            title="¿Por qué elegir VinylPro?"
            description="Especialistas exclusivamente en suelos vinílicos PVC en Gran Canaria."
          />
        </FadeIn>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyVinylPro.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.07}>
              <div className="group flex gap-4 rounded-2xl border border-border bg-surface/50 p-6 transition-all duration-500 hover:border-accent/30 hover:bg-white hover:shadow-xl hover:shadow-black/[0.04]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
