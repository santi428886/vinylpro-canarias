"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AMBIENT_SCENES,
  AMBIENT_SCENE_LABELS,
  ambientImagePath,
} from "@/data/ambient-images";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Lightbox from "@/components/ui/Lightbox";

export default function InspirationGallery() {
  const [activeScene, setActiveScene] = useState<string | null>(null);

  const activeIndex = activeScene
    ? AMBIENT_SCENES.indexOf(activeScene as (typeof AMBIENT_SCENES)[number])
    : -1;

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader title="Inspiración" />
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {AMBIENT_SCENES.map((scene, i) => {
            const src = ambientImagePath(scene);
            const label = AMBIENT_SCENE_LABELS[scene];

            return (
              <FadeIn key={scene} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setActiveScene(scene)}
                  className={`group relative block w-full cursor-pointer overflow-hidden rounded-[1.5rem] bg-neutral-100 shadow-sm transition-shadow duration-500 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.15)] ${
                    i === 0 ? "col-span-2 aspect-[16/9] lg:col-span-2" : "aspect-[4/3]"
                  }`}
                  aria-label={`Ver ${label}`}
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    loading="lazy"
                    className="object-cover object-[center_75%] transition duration-700 group-hover:scale-[1.03]"
                    sizes={
                      i === 0
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 640px) 50vw, 33vw"
                    }
                  />
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {activeScene && activeIndex >= 0 && (
        <Lightbox
          src={ambientImagePath(
            activeScene as (typeof AMBIENT_SCENES)[number],
          )}
          alt={AMBIENT_SCENE_LABELS[activeScene as (typeof AMBIENT_SCENES)[number]]}
          isOpen
          onClose={() => setActiveScene(null)}
        />
      )}
    </section>
  );
}
