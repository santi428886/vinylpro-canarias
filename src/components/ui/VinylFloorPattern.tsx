"use client";

import {
  DEFAULT_FLOOR_FALLBACK,
  parseTextureToken,
  sanitizeFloorPath,
  type FloorGalleryRole,
  type VinylFloorCategory,
} from "@/data/floor-images";
import {
  getPatternLabel,
  getPatternStyle,
  PATTERN_CONFIG,
} from "@/data/floor-patterns";
import styles from "./VinylFloorPattern.module.css";

type VinylFloorPatternProps = {
  src?: string;
  category?: VinylFloorCategory;
  role?: FloorGalleryRole;
  alt: string;
  className?: string;
  showLabel?: boolean;
};

/**
 * Textura CSS de suelo vinílico — sin imágenes externas.
 * Roles: installed · texture · detail
 */
export default function VinylFloorPattern({
  src,
  category: categoryProp,
  role: roleProp = "installed",
  alt,
  className = "",
  showLabel = false,
}: VinylFloorPatternProps) {
  let category = categoryProp;
  let role = roleProp;

  if (src) {
    const token = sanitizeFloorPath(src);
    const parsed = parseTextureToken(token) ?? parseTextureToken(DEFAULT_FLOOR_FALLBACK)!;
    category = parsed.category;
    role = parsed.role;
  }

  const resolvedCategory = category ?? "roble-claro";
  const kind = PATTERN_CONFIG[resolvedCategory]?.kind ?? "wood";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${styles.root} ${className}`}
      data-role={role}
      data-kind={kind}
      style={getPatternStyle(resolvedCategory, role)}
    >
      {showLabel && (
        <span className={styles.label}>{getPatternLabel(resolvedCategory)}</span>
      )}
    </div>
  );
}
