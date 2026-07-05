"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { allProducts, filterProducts } from "@/lib/products";
import type { FloorSystem, ProductFilters } from "@/types/product";
import CatalogFilters from "./CatalogFilters";
import ProductCard from "./ProductCard";

const VALID_SISTEMAS: FloorSystem[] = ["spc-click", "adhesivo", "rollo"];

function isValidSistema(value: string | null): value is FloorSystem {
  return VALID_SISTEMAS.includes(value as FloorSystem);
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const sistemaParam = searchParams.get("sistema");

  const [filters, setFilters] = useState<ProductFilters>({
    sort: "popularidad",
  });

  useEffect(() => {
    if (isValidSistema(sistemaParam)) {
      setFilters((prev) => ({ ...prev, sistema: [sistemaParam] }));
    }
  }, [sistemaParam]);

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
            <div className="rounded-2xl bg-white py-20 text-center">
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

export default function CatalogPageContent() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 text-center text-muted sm:px-8">
          Cargando catálogo…
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
