"use client";

import Image from "next/image";
import { useState } from "react";
import {
  catalogCardImages,
  floorImagePath,
  primaryFloorImage,
  type FloorGalleryShot,
} from "@/data/floor-gallery";

type FloorImageProps = {
  slug: string;
  shot?: FloorGalleryShot;
  /** Catálogo: ambiente + textura al hover */
  variant?: "shot" | "catalog";
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export default function FloorImage({
  slug,
  shot = "portada",
  variant = "shot",
  alt,
  className = "",
  fill,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: FloorImageProps) {
  const catalog = variant === "catalog" ? catalogCardImages(slug) : null;
  const initialSrc =
    catalog?.primary ?? floorImagePath(slug, shot);
  const hoverSrc = catalog?.hover ?? primaryFloorImage(slug);

  const [src, setSrc] = useState(initialSrc);
  const fallback = primaryFloorImage(slug);

  const handleError = () => {
    if (src !== fallback) setSrc(fallback);
    else if (catalog && src !== floorImagePath(slug, "portada")) {
      setSrc(floorImagePath(slug, "portada"));
    }
  };

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={handleError}
        className={`object-cover ${className}`}
        data-hover-src={hoverSrc !== initialSrc ? hoverSrc : undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      className={`object-cover ${className}`}
    />
  );
}
