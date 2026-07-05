import type { ProductBadge } from "@/types/product";
import { BADGE_LABELS } from "@/types/product";

const badgeStyles: Record<ProductBadge, string> = {
  nuevo: "bg-sky-500 text-white",
  premium: "bg-foreground text-white",
  "mas-vendido": "bg-accent text-white",
  oferta: "bg-rose-500 text-white",
};

type ProductBadgeTagProps = {
  badge: ProductBadge;
};

export default function ProductBadgeTag({ badge }: ProductBadgeTagProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${badgeStyles[badge]}`}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
