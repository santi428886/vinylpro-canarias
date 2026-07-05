type StarRatingProps = {
  value: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
};

export default function StarRating({
  value,
  max = 5,
  size = "sm",
  label,
}: StarRatingProps) {
  const starSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="min-w-[100px] text-xs text-muted sm:text-sm">{label}</span>
      )}
      <div className={`flex gap-0.5 ${starSize}`} aria-label={`${value} de ${max}`}>
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={i < value ? "text-amber-400" : "text-border"}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
