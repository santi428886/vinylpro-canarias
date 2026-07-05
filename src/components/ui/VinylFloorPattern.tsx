"use client";

import {
  DEFAULT_FLOOR_FALLBACK,
  parseTextureToken,
  sanitizeFloorPath,
  type VinylFloorCategory,
} from "@/data/floor-images";
import {
  getPatternLabel,
  getPatternStyle,
  PATTERN_CONFIG,
} from "@/data/floor-patterns";
import styles from "./VinylFloorPattern.module.css";

type VinylFloorPatternProps = {
  /** Token `vinyl-texture:category:variant` from product data */
  src?: string;
  category?: VinylFloorCategory;
  variant?: number;
  alt: string;
  className?: string;
  showLabel?: boolean;
};

/**
 * CSS-only vinyl floor texture — no external images.
 * Variants: 0 textura · 1 lama · 2 tono instalado
 */
export default function VinylFloorPattern({
  src,
  category: categoryProp,
  variant: variantProp = 0,
  alt,
  className = "",
  showLabel = false,
}: VinylFloorPatternProps) {
  let category = categoryProp;
  let variant = variantProp;

  if (src) {
    const token = sanitizeFloorPath(src);
    const parsed = parseTextureToken(token) ?? parseTextureToken(DEFAULT_FLOOR_FALLBACK)!;
    category = parsed.category;
    variant = parsed.variant;
  }

  const resolvedCategory = category ?? "roble-claro";
  const resolvedVariant = variant % 3;
  const kind = PATTERN_CONFIG[resolvedCategory]?.kind ?? "wood";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${styles.root} ${className}`}
      data-variant={String(resolvedVariant)}
      data-kind={kind}
      style={getPatternStyle(resolvedCategory, resolvedVariant)}
    >
      {showLabel && (
        <span className={styles.label}>{getPatternLabel(resolvedCategory)}</span>
      )}
    </div>
  );
}
