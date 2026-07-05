"use client";

import { GitCompareArrows } from "lucide-react";
import { useCatalogExperience } from "@/context/CatalogExperienceContext";

type CompareToggleProps = {
  slug: string;
  className?: string;
};

export default function CompareToggle({ slug, className = "" }: CompareToggleProps) {
  const { isCompare, toggleCompare, canAddCompare } = useCatalogExperience();
  const active = isCompare(slug);
  const disabled = !active && !canAddCompare;

  return (
    <button
      type="button"
      aria-label={active ? "Quitar de comparación" : "Añadir a comparación"}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCompare(slug);
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 ${active ? "ring-2 ring-accent" : ""} ${className}`}
    >
      <GitCompareArrows
        className={`h-4 w-4 ${active ? "text-accent" : "text-foreground/60"}`}
      />
    </button>
  );
}
