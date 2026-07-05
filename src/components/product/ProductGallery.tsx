"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import FloorImage from "@/components/ui/FloorImage";
import { DEFAULT_FLOOR_FALLBACK, sanitizeFloorUrl } from "@/data/floor-images";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const gallery = images.length > 0 ? images.map(sanitizeFloorUrl) : [DEFAULT_FLOOR_FALLBACK];
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const getSrc = (i: number) =>
    failed.has(i) ? DEFAULT_FLOOR_FALLBACK : gallery[i];

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

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
                key={gallery[active]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <FloorImage
                  src={getSrc(active)}
                  alt={alt}
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </motion.div>
            </AnimatePresence>

            <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </span>

            {gallery.length > 1 && (
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

        {gallery.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {gallery.map((img, i) => (
              <button
                key={`${img}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl transition ${
                  active === i
                    ? "ring-2 ring-accent ring-offset-2"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <FloorImage src={getSrc(i)} alt="" sizes="80px" />
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
              <p className="text-sm font-medium text-white/70">{alt}</p>
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
              <FloorImage
                src={getSrc(active)}
                alt={alt}
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex justify-center gap-2 px-5 py-6">
                {gallery.map((img, i) => (
                  <button
                    key={`zoom-${img}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-2 w-2 rounded-full transition ${
                      active === i ? "bg-white" : "bg-white/30"
                    }`}
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
