"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import FloorImage from "@/components/ui/FloorImage";
import { resolveAmbientImage } from "@/data/ambient-images";
import {
  GALLERY_SHOTS,
  GALLERY_LABELS,
  type FloorGalleryShot,
} from "@/data/floor-gallery";

type GallerySlide = {
  id: string;
  label: string;
  src?: string;
  shot?: FloorGalleryShot;
};

function buildGallerySlides(slug: string): GallerySlide[] {
  const ambient = resolveAmbientImage(slug);
  const slides: GallerySlide[] = [];

  if (ambient) {
    slides.push({ id: "ambiente", label: "Ambiente instalado", src: ambient });
  }

  for (const shot of GALLERY_SHOTS) {
    if (shot === "portada" && ambient) continue;
    slides.push({ id: shot, label: GALLERY_LABELS[shot], shot });
  }

  return slides;
}

type ProductGalleryProps = {
  slug: string;
  alt: string;
};

export default function ProductGallery({ slug, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const slides = useMemo(() => buildGallerySlides(slug), [slug]);
  const activeSlide = slides[active] ?? slides[0];

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  return (
    <>
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-3xl bg-surface">
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="group relative aspect-[4/5] w-full sm:aspect-square lg:min-h-[560px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {activeSlide.src ? (
                  <Image
                    src={activeSlide.src}
                    alt={`${alt} — ${activeSlide.label}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={active === 0}
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <FloorImage
                    slug={slug}
                    shot={activeSlide.shot ?? "salon"}
                    alt={`${alt} — ${activeSlide.label}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={active === 0}
                    className="transition duration-700 group-hover:scale-[1.02]"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <span className="absolute left-5 top-5 rounded-full bg-black/50 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {activeSlide.label}
            </span>

            <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </span>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition group-hover:opacity-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition group-hover:opacity-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </button>
        </div>

        {slides.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActive(i)}
                className={`relative shrink-0 overflow-hidden rounded-xl transition ${
                  active === i
                    ? "ring-2 ring-accent ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="relative h-20 w-20">
                  {slide.src ? (
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <FloorImage
                      slug={slug}
                      shot={slide.shot ?? "salon"}
                      alt={slide.label}
                      fill
                      sizes="80px"
                    />
                  )}
                </div>
                <span className="mt-1 block max-w-20 truncate text-center text-[10px] text-muted">
                  {slide.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">{alt}</p>
                <p className="text-xs text-white/60">{activeSlide.label}</p>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={() => setZoomOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1">
              {activeSlide.src ? (
                <Image
                  src={activeSlide.src}
                  alt={`${alt} — ${activeSlide.label}`}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              ) : (
                <FloorImage
                  slug={slug}
                  shot={activeSlide.shot ?? "salon"}
                  alt={`${alt} — ${activeSlide.label}`}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              )}
            </div>
            {slides.length > 1 && (
              <div className="flex justify-center gap-2 px-5 py-6">
                {slides.map((slide, i) => (
                  <button
                    key={`zoom-${slide.id}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-2 w-2 rounded-full transition ${
                      active === i ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={slide.label}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
