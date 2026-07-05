import {
  LayoutGrid,
  Clock,
  ShieldCheck,
  UserCheck,
  Award,
  HardHat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { whyVinylPro } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  grid: LayoutGrid,
  clock: Clock,
  "shield-check": ShieldCheck,
  "user-check": UserCheck,
  award: Award,
  "hard-hat": HardHat,
};

export default function WhyVinylPro() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="VinylPro Canarias"
            title="¿Por qué elegir VinylPro Canarias?"
            description="Especialistas exclusivamente en suelos vinílicos PVC en Gran Canaria."
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyVinylPro.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Award;
            return (
              <FadeIn key={item.title} delay={i * 0.07}>
                <div className="group rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-500 hover:border-accent/30 hover:bg-white hover:shadow-xl hover:shadow-black/[0.04]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent shadow-sm transition duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
