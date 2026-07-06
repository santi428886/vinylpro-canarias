"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type LightboxProps = {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative h-[70vh] w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}
