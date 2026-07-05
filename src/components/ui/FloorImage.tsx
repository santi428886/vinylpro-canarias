"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import {
  DEFAULT_FLOOR_FALLBACK,
  getFallbackChain,
  sanitizeFloorPath,
} from "@/data/floor-images";

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
  const initial = sanitizeFloorPath(src);
  const [currentSrc, setCurrentSrc] = useState(initial);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = useCallback(() => {
    const chain = getFallbackChain(initial);
    const nextIndex = fallbackIndex + 1;
    if (nextIndex < chain.length) {
      setFallbackIndex(nextIndex);
      setCurrentSrc(chain[nextIndex]);
    } else {
      setCurrentSrc(DEFAULT_FLOOR_FALLBACK);
    }
  }, [initial, fallbackIndex]);

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
      onError={handleError}
    />
  );
}
