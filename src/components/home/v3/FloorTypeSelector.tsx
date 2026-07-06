"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { floorSystems } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FloorTypeSelector() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Guía de compra"
            title="¿Qué tipo de suelo vinílico necesitas?"
            description="Descubre cuál es la mejor opción según tu vivienda y tu forma de uso."
          />
        </FadeIn>

        <div className="mt-20 space-y-12 lg:space-y-16">
          {floorSystems.map((system, i) => (
            <FadeIn key={system.id} delay={i * 0.1}>
              <article className="group overflow-hidden rounded-[2rem] border border-border/80 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.12)]">
                <div
                  className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px] lg:[direction:ltr]">
                    <Image
                      src={system.image}
                      alt={system.title}
                      fill
                      loading="lazy"
                      className="object-cover object-[center_75%] transition duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14 lg:[direction:ltr]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {system.subtitle}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {system.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted">
                      {system.description}
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                          Ideal para
                        </p>
                        <ul className="mt-3 space-y-2">
                          {system.idealFor.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <span className="h-1 w-1 rounded-full bg-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                          Ventajas
                        </p>
                        <ul className="mt-3 space-y-2">
                          {system.advantages.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <Check className="h-4 w-4 shrink-0 text-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={system.href}
                      className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-white transition hover:bg-foreground/90"
                    >
                      {system.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
