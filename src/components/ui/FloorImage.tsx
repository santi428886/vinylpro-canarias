"use client";

import Image from "next/image";
import { useState } from "react";
import { DEFAULT_FLOOR_FALLBACK, sanitizeFloorUrl } from "@/data/floor-images";

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

export default function FloorImage({
  src,
  alt,
  fill = true,
  priority = false,
  loading,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 50vw",
  width,
  height,
}: FloorImageProps) {
  const [currentSrc, setCurrentSrc] = useState(sanitizeFloorUrl(src));

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill && !width}
      width={width}
      height={height}
      priority={priority}
      loading={loading ?? (priority ? undefined : "lazy")}
      className={className}
      sizes={sizes}
      onError={() => {
        if (currentSrc !== DEFAULT_FLOOR_FALLBACK) {
          setCurrentSrc(DEFAULT_FLOOR_FALLBACK);
        }
      }}
    />
  );
}
