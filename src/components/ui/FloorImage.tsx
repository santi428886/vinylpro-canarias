"use client";

import {
  DEFAULT_FLOOR_FALLBACK,
  parseTextureToken,
  sanitizeFloorPath,
} from "@/data/floor-images";
import FloorTextureVisual from "@/components/ui/FloorTextureVisual";

type FloorImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Visual del catálogo — renderiza texturas CSS de suelo vinílico.
 * No carga imágenes externas: imposible mostrar contenido incorrecto.
 */
export default function FloorImage({
  src,
  alt,
  className = "",
}: FloorImageProps) {
  const token = sanitizeFloorPath(src);
  const parsed = parseTextureToken(token) ?? parseTextureToken(DEFAULT_FLOOR_FALLBACK)!;

  return (
    <FloorTextureVisual
      category={parsed.category}
      variant={parsed.variant}
      alt={alt}
      className={className}
    />
  );
}
