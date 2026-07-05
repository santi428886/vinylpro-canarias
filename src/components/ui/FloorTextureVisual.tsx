"use client";

import type { VinylFloorCategory } from "@/data/floor-images";
import {
  getTextureLabel,
  getTextureStyle,
} from "@/components/ui/floor-texture-styles";

type FloorTextureVisualProps = {
  category: VinylFloorCategory;
  variant?: number;
  alt: string;
  className?: string;
  showLabel?: boolean;
};

/**
 * Renderiza una textura de suelo vinílico generada con CSS puro.
 * Sin URLs externas — imposible mostrar casas, agua o plástico.
 */
export default function FloorTextureVisual({
  category,
  variant = 0,
  alt,
  className = "",
  showLabel = false,
}: FloorTextureVisualProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 ${className}`}
      style={getTextureStyle(category, variant)}
    >
      {showLabel && (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
          {getTextureLabel(category)}
        </span>
      )}
    </div>
  );
}
