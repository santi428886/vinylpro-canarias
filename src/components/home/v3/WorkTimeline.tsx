"use client";

import {
  Camera,
  MessageCircle,
  Calculator,
  Palette,
  Hammer,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { workTimeline } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  camera: Camera,
  message: MessageCircle,
  calculator: Calculator,
  palette: Palette,
  hammer: Hammer,
  sparkles: Sparkles,
};

export default function WorkTimeline() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Proceso"
            title="¿Cómo trabajamos?"
            description="De tus fotos a tu suelo nuevo en seis pasos claros y sin complicaciones."
          />
        </FadeIn>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-12 h-px bg-border" />
          <div className="grid grid-cols-6 gap-4">
            {workTimeline.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Camera;
              return (
                <FadeIn key={item.step} delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <Icon className="h-6 w-6 text-accent" />
                      <span className="mt-1 text-xs font-semibold text-muted">
                        {String(item.step).padStart(2, "0")}
                      </span>
                    </div>
                    {i < workTimeline.length - 1 && (
                      <ChevronRight className="absolute -right-3 top-9 z-20 h-5 w-5 text-border" />
                    )}
                    <h3 className="mt-5 text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-border" />
          <div className="space-y-8">
            {workTimeline.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Camera;
              return (
                <FadeIn key={item.step} delay={i * 0.06}>
                  <div className="relative flex gap-6 pl-14">
                    <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-semibold text-accent">
                        Paso {item.step}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
