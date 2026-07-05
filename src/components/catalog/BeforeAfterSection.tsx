"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { beforeAfterItems } from "@/data/catalog-experience";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

function BeforeAfterSlide({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [position, setPosition] = useState(50);

  const handleMove = useCallback(
    (clientX: number, rect: DOMRect) => {
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(100, Math.max(0, x)));
    },
    [],
  );

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div
        className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden sm:aspect-[21/9]"
        onMouseMove={(e) => {
          if (e.buttons !== 1) return;
          handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleMove(touch.clientX, e.currentTarget.getBoundingClientRect());
        }}
        onClick={(e) =>
          handleMove(e.clientX, e.currentTarget.getBoundingClientRect())
        }
      >
        <Image src={after} alt={`${title} — después`} fill className="object-cover" sizes="100vw" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before} alt={`${title} — antes`} fill className="object-cover" sizes="100vw" />
        </div>
        <div
          className="absolute bottom-0 top-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-xs font-bold text-foreground">↔</span>
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Antes
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Después
        </span>
      </div>
      <p className="p-5 text-center text-sm font-medium text-foreground">{title}</p>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Transformaciones"
            title="Antes y después"
            description="Arrastra el slider para ver la diferencia. Proyectos reales en Gran Canaria."
          />
        </FadeIn>

        <div className="mt-16 space-y-10">
          {beforeAfterItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.1}>
              <BeforeAfterSlide
                before={item.before}
                after={item.after}
                title={item.title}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
