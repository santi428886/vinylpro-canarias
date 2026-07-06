import type { ProductBadge } from "@/types/product";
import { BADGE_LABELS } from "@/types/product";

const defaultStyles: Record<ProductBadge, string> = {
  nuevo: "bg-sky-500 text-white",
  premium: "bg-foreground text-white",
  "mas-vendido": "bg-accent text-white",
  oferta: "bg-rose-500 text-white",
};

const premiumStyles: Record<ProductBadge, string> = {
  nuevo: "border border-sky-200/80 bg-sky-50/95 text-sky-800 backdrop-blur-md",
  premium:
    "border border-amber-200/60 bg-foreground/90 text-amber-100 backdrop-blur-md",
  "mas-vendido":
    "border border-white/20 bg-accent/95 text-white backdrop-blur-md",
  oferta: "border border-rose-200/80 bg-rose-50/95 text-rose-800 backdrop-blur-md",
};

type ProductBadgeTagProps = {
  badge: ProductBadge;
  size?: "sm" | "md";
  variant?: "default" | "premium";
};

export default function ProductBadgeTag({
  badge,
  size = "md",
  variant = "default",
}: ProductBadgeTagProps) {
  const styles = variant === "premium" ? premiumStyles : defaultStyles;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-[0.14em] ${styles[badge]} ${
        size === "sm"
          ? "px-2.5 py-0.5 text-[9px]"
          : "px-3 py-1 text-[11px] tracking-wider"
      }`}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
