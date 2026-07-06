"use client";

import {
  Shield,
  Droplets,
  Clock,
  Heart,
  Wrench,
  Euro,
  Home,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  comparisonFeatures,
  levelColors,
  systemLabels,
} from "@/data/home-v3";
import type { FloorSystem } from "@/types/product";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  droplets: Droplets,
  clock: Clock,
  heart: Heart,
  wrench: Wrench,
  euro: Euro,
  home: Home,
};

const systems: FloorSystem[] = ["spc-click", "adhesivo", "rollo"];

export default function FloorComparison() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Comparativa"
            title="Encuentra tu suelo ideal"
            description="Compara los tres sistemas de instalación de un vistazo. Sin tablas aburridas."
          />
        </FadeIn>

        {/* System headers */}
        <FadeIn delay={0.1}>
          <div className="mt-16 hidden grid-cols-4 gap-4 lg:grid">
            <div />
            {systems.map((s) => (
              <div
                key={s}
                className="rounded-2xl bg-white px-4 py-5 text-center shadow-sm"
              >
                <p className="text-sm font-semibold text-foreground">
                  {systemLabels[s]}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Feature rows — desktop */}
        <div className="mt-4 hidden space-y-3 lg:block">
          {comparisonFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Shield;
            return (
              <FadeIn key={feature.key} delay={i * 0.05}>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {feature.label}
                    </span>
                  </div>
                  {systems.map((s) => {
                    const val = feature.values[s];
                    const colors = levelColors[val.level];
                    return (
                      <div
                        key={s}
                        className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-4 ${colors.bg}`}
                      >
                        <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                        <span className={`text-sm font-medium ${colors.text}`}>
                          {val.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile — card per system */}
        <div className="mt-12 grid gap-6 lg:hidden">
          {systems.map((s, si) => (
            <FadeIn key={s} delay={si * 0.1}>
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="border-b border-border bg-foreground px-6 py-4">
                  <p className="text-base font-semibold text-white">
                    {systemLabels[s]}
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {comparisonFeatures.map((feature) => {
                    const Icon = iconMap[feature.icon] ?? Shield;
                    const val = feature.values[s];
                    const colors = levelColors[val.level];
                    return (
                      <div
                        key={feature.key}
                        className="flex items-center justify-between gap-4 px-6 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted">
                            {feature.label}
                          </span>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
                        >
                          {val.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
