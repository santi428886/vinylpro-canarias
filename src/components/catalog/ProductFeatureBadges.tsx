import type { Product } from "@/types/product";
import ProductBadgeTag from "./ProductBadgeTag";

type FeatureBadge = {
  id: string;
  label: string;
};

function featureBadgesFor(product: Product): FeatureBadge[] {
  const badges: FeatureBadge[] = [];

  if (product.badge === "mas-vendido") {
    badges.push({ id: "bestseller", label: "⭐ Más vendido" });
  } else if (product.badge === "premium") {
    badges.push({ id: "premium", label: "✨ Premium" });
  } else if (product.badge === "nuevo") {
    badges.push({ id: "nuevo", label: "🆕 Nuevo" });
  }

  if (product.ratings.agua >= 5) {
    badges.push({ id: "agua", label: "💧 100% resistente al agua" });
  }

  if (product.usos.includes("vivienda")) {
    badges.push({ id: "vivienda", label: "🏡 Ideal para viviendas" });
  }

  if (product.ratings.mascotas >= 4) {
    badges.push({ id: "mascotas", label: "🐶 Apto para mascotas" });
  }

  if (product.garantia.includes("20") || product.garantia.includes("15")) {
    badges.push({ id: "garantia", label: "🛡️ Garantía 20 años" });
  }

  return badges.slice(0, 3);
}

type ProductFeatureBadgesProps = {
  product: Product;
  size?: "sm" | "md";
  className?: string;
};

export default function ProductFeatureBadges({
  product,
  size = "sm",
  className = "",
}: ProductFeatureBadgesProps) {
  const badges = featureBadgesFor(product);

  if (badges.length === 0 && !product.badge) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {product.badge && product.badge !== "mas-vendido" && (
        <ProductBadgeTag badge={product.badge} size={size} variant="premium" />
      )}
      {badges.map((b) => (
        <span
          key={b.id}
          className={`inline-flex items-center rounded-full border border-white/25 bg-black/40 font-medium text-white backdrop-blur-md ${
            size === "sm"
              ? "px-2.5 py-1 text-[10px] leading-tight"
              : "px-3 py-1.5 text-xs"
          }`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}
