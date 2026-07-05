"use client";

import Image from "next/image";
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
    <section aria-labelledby="color-selector-heading" className="mt-16 sm:mt-20">
      <h2
        id="color-selector-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Seleccionar por <span className="text-accent">color</span>
      </h2>

      <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8">
        {COLOR_SWATCHES.map((swatch) => {
          const active = activeColor === swatch.id;
          return (
            <button
              key={swatch.id}
              type="button"
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
              className="group flex flex-col items-center gap-3"
            >
              <span
                className={`relative block h-20 w-20 overflow-hidden rounded-full shadow-sm transition-all duration-300 sm:h-24 sm:w-24 ${
                  active
                    ? "ring-2 ring-accent ring-offset-4 scale-105"
                    : "ring-1 ring-border group-hover:scale-105 group-hover:shadow-md"
                }`}
              >
                <Image
                  src={textureImagePath(swatch.previewTexture)}
                  alt={swatch.label}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
              <span
                className={`text-sm font-medium transition ${
                  active ? "text-accent" : "text-muted group-hover:text-foreground"
                }`}
              >
                {swatch.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
