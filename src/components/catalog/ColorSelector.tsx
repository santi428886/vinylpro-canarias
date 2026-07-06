"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { textureImagePath } from "@/data/floor-gallery";
import {
  COLOR_SWATCHES,
  categoriesForVisualColor,
  type VisualColorId,
} from "@/data/catalog-visual";
import type { ProductFilters } from "@/types/product";

type ColorSelectorProps = {
  activeColor: VisualColorId | null;
  onSelect: (filters: Partial<ProductFilters>, color: VisualColorId | null) => void;
};

export default function ColorSelector({ activeColor, onSelect }: ColorSelectorProps) {
  return (
    <section aria-labelledby="color-selector-heading" className="mt-14 sm:mt-16">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="color-selector-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Por color
        </h2>
        {activeColor && (
          <button
            type="button"
            onClick={() =>
              onSelect(
                { patternCategory: undefined, visualColor: null },
                null,
              )
            }
            className="text-xs font-medium text-muted transition hover:text-foreground"
          >
            Todos los colores
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible">
        {COLOR_SWATCHES.map((swatch, i) => {
          const active = activeColor === swatch.id;
          return (
            <motion.button
              key={swatch.id}
              type="button"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              onClick={() => {
                if (active) {
                  onSelect(
                    { patternCategory: undefined, visualColor: null },
                    null,
                  );
                } else {
                  onSelect(
                    {
                      patternCategory: categoriesForVisualColor(swatch.id),
                      visualColor: swatch.id,
                    },
                    swatch.id,
                  );
                }
              }}
              className="group flex shrink-0 flex-col items-center gap-2.5"
            >
              <span
                className={`relative block h-[72px] w-[72px] overflow-hidden rounded-full transition-all duration-300 sm:h-20 sm:w-20 ${
                  active
                    ? "ring-2 ring-foreground ring-offset-[3px] scale-105"
                    : "ring-1 ring-border/80 group-hover:scale-105 group-hover:ring-foreground/25"
                }`}
              >
                <Image
                  src={textureImagePath(swatch.previewTexture)}
                  alt={swatch.label}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span
                className={`text-xs font-medium transition ${
                  active ? "text-foreground" : "text-muted group-hover:text-foreground"
                }`}
              >
                {swatch.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
