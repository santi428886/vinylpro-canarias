import {
  Package,
  Wrench,
  Scissors,
  Ruler,
  Sparkles,
  ShieldCheck,
  Layers,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { installationIncludes } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  package: Package,
  wrench: Wrench,
  scissors: Scissors,
  ruler: Ruler,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  layers: Layers,
  trash: Trash2,
};

export default function InstallationIncludes() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Transparencia"
            title="¿Qué incluye la instalación?"
            description="Todo lo que necesitas para estrenar suelo, sin sorpresas en el presupuesto."
          />
        </FadeIn>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {installationIncludes.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Package;
            return (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="group relative h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04]">
                  {item.optional && (
                    <span className="absolute right-4 top-4 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                      Opcional
                    </span>
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
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
