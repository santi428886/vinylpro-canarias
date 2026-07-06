"use client";

import Image from "next/image";
import { useState } from "react";
import { catalogCardImages, primaryFloorImage } from "@/data/floor-gallery";

type CatalogProductImageProps = {
  slug: string;
  alt: string;
  className?: string;
  hoverClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export default function CatalogProductImage({
  slug,
  alt,
  className = "",
  hoverClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: CatalogProductImageProps) {
  const { primary, hover } = catalogCardImages(slug);
  const fallback = primaryFloorImage(slug);
  const [primarySrc, setPrimarySrc] = useState(primary);
  const [hoverSrc, setHoverSrc] = useState(hover);

  const onPrimaryError = () => {
    if (primarySrc !== fallback) setPrimarySrc(fallback);
  };

  const onHoverError = () => {
    if (hoverSrc !== fallback) setHoverSrc(fallback);
  };

  return (
    <>
      <Image
        src={primarySrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={onPrimaryError}
        className={`object-cover ${className}`}
      />
      <Image
        src={hoverSrc}
        alt={`${alt} — detalle`}
        fill
        sizes={sizes}
        onError={onHoverError}
        className={`object-cover ${hoverClassName}`}
      />
    </>
  );
}
