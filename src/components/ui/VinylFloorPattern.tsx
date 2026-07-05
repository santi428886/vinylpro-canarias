"use client";

import {
  DEFAULT_PATTERN_CATEGORY,
  getPatternLabel,
  getPatternStyle,
  PATTERN_CONFIG,
  type FloorGalleryRole,
  type VinylFloorCategory,
} from "@/data/floor-patterns";
import styles from "./VinylFloorPattern.module.css";

type VinylFloorPatternProps = {
  category?: VinylFloorCategory;
  role?: FloorGalleryRole;
  alt: string;
  className?: string;
  showLabel?: boolean;
};

/**
 * Patrón CSS de suelo vinílico — sin imágenes externas.
 */
export default function VinylFloorPattern({
  category = DEFAULT_PATTERN_CATEGORY,
  role = "installed",
  alt,
  className = "",
  showLabel = false,
}: VinylFloorPatternProps) {
  const kind = PATTERN_CONFIG[category]?.kind ?? "wood";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${styles.root} ${className}`}
      data-role={role}
      data-kind={kind}
      style={getPatternStyle(category, role)}
    >
      {showLabel && (
        <span className={styles.label}>{getPatternLabel(category)}</span>
      )}
    </div>
  );
}
