"use client";

import { useMemo, useState } from "react";
import { allProducts, filterProducts } from "@/lib/products";
import type { ProductFilters } from "@/types/product";
import CatalogFilters from "./CatalogFilters";
import ProductCard from "./ProductCard";
import FadeIn from "@/components/ui/FadeIn";

export default function CatalogPageContent() {
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "popularidad",
  });

  const filtered = useMemo(
    () => filterProducts(allProducts, filters),
    [filters],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <CatalogFilters
            filters={filters}
            onChange={setFilters}
            total={filtered.length}
          />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-surface py-20 text-center">
              <p className="text-muted">No hay modelos con estos filtros.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
