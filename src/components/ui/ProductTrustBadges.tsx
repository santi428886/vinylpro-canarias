type ProductTrustBadgesProps = {
  className?: string;
  variant?: "overlay" | "inline";
  showRating?: boolean;
  showAvailability?: boolean;
};

export function ProductRating({
  className = "",
  variant = "inline",
}: Pick<ProductTrustBadgesProps, "className" | "variant">) {
  const styles =
    variant === "overlay"
      ? "bg-white/95 text-foreground shadow-sm backdrop-blur-sm"
      : "text-foreground";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${styles} ${className}`}
    >
      <span className="tracking-tight text-amber-500" aria-hidden>
        ★★★★★
      </span>
      <span>5.0</span>
    </span>
  );
}

export function ProductAvailabilityBadges({
  className = "",
  variant = "inline",
}: Pick<ProductTrustBadgesProps, "className" | "variant">) {
  const badgeStyles =
    variant === "overlay"
      ? "bg-white/95 text-foreground shadow-sm backdrop-blur-sm"
      : "bg-surface text-foreground";

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeStyles}`}
      >
        Disponible
      </span>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeStyles}`}
      >
        Entrega rápida
      </span>
    </div>
  );
}

export default function ProductTrustBadges({
  className = "",
  variant = "inline",
  showRating = true,
  showAvailability = true,
}: ProductTrustBadgesProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {showRating && <ProductRating variant={variant} />}
      {showAvailability && <ProductAvailabilityBadges variant={variant} />}
    </div>
  );
}
