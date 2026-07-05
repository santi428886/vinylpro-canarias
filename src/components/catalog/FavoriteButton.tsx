"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCatalogExperience } from "@/context/CatalogExperienceContext";

type FavoriteButtonProps = {
  slug: string;
  className?: string;
};

export default function FavoriteButton({ slug, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useCatalogExperience();
  const active = isFavorite(slug);

  return (
    <motion.button
      type="button"
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition hover:bg-white ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${active ? "fill-rose-500 text-rose-500" : "text-foreground/60"}`}
      />
    </motion.button>
  );
}
