"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import VinylFloorPattern from "@/components/ui/VinylFloorPattern";
import {
  GALLERY_ROLES,
  getRoleLabel,
  type FloorGalleryRole,
  type VinylFloorCategory,
} from "@/data/floor-patterns";

type ProductGalleryProps = {
  category: VinylFloorCategory;
  alt: string;
};

export default function ProductGallery({ category, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const roles: FloorGalleryRole[] = GALLERY_ROLES;
  const activeRole = roles[active] ?? "installed";

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % roles.length);
  }, [roles.length]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + roles.length) % roles.length);
  }, [roles.length]);

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
                key={activeRole}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <VinylFloorPattern
                  category={category}
                  role={activeRole}
                  alt={`${alt} — ${getRoleLabel(activeRole)}`}
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </motion.div>
            </AnimatePresence>

            <span className="absolute left-5 top-5 rounded-full bg-black/50 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {getRoleLabel(activeRole)}
            </span>

            <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
              <Expand className="h-3.5 w-3.5" />
              Ampliar
            </span>

            {roles.length > 1 && (
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

        {roles.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {roles.map((role, i) => (
              <button
                key={role}
                type="button"
                onClick={() => setActive(i)}
                className={`relative shrink-0 overflow-hidden rounded-xl transition ${
                  active === i
                    ? "ring-2 ring-accent ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <div className="relative h-20 w-20">
                  <VinylFloorPattern
                    category={category}
                    role={role}
                    alt={getRoleLabel(role)}
                  />
                </div>
                <span className="mt-1 block max-w-20 truncate text-center text-[10px] text-muted">
                  {getRoleLabel(role).split(" ")[0]}
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
                <p className="text-xs text-white/60">{getRoleLabel(activeRole)}</p>
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
              <VinylFloorPattern
                category={category}
                role={activeRole}
                alt={`${alt} — ${getRoleLabel(activeRole)}`}
                className="object-contain p-4"
              />
            </div>
            {roles.length > 1 && (
              <div className="flex justify-center gap-2 px-5 py-6">
                {roles.map((role, i) => (
                  <button
                    key={`zoom-${role}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-2 w-2 rounded-full transition ${
                      active === i ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={getRoleLabel(role)}
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
