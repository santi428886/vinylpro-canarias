"use client";

import Image from "next/image";
import { useState } from "react";
import {
  floorImagePath,
  primaryFloorImage,
  type FloorGalleryShot,
} from "@/data/floor-gallery";

type FloorImageProps = {
  slug: string;
  shot: FloorGalleryShot;
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
  shot,
  alt,
  className = "",
  fill,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: FloorImageProps) {
  const [src, setSrc] = useState(floorImagePath(slug, shot));
  const fallback = primaryFloorImage(slug);

  const handleError = () => {
    if (src !== fallback) setSrc(fallback);
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
