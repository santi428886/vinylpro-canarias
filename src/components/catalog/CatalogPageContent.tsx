"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { allProducts, filterProducts } from "@/lib/products";
import type { FloorSystem, ProductFilters } from "@/types/product";
import type { RoomId, VisualColorId } from "@/data/catalog-visual";
import CatalogFilters from "./CatalogFilters";
import ProductCard from "./ProductCard";
import CompareBar from "./CompareBar";
import RoomSelector from "./RoomSelector";
import ColorSelector from "./ColorSelector";
import BestSellersSection from "./BestSellersSection";

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

  const applyVisualFilters = useCallback(
    (partial: Partial<ProductFilters>, scroll = true) => {
      setFilters((prev) => ({ ...prev, ...partial }));
      if (scroll) {
        requestAnimationFrame(() => {
          document
            .getElementById("catalog-grid")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    [],
  );

  const handleRoomSelect = useCallback(
    (partial: Partial<ProductFilters>, room: RoomId | null) => {
      applyVisualFilters({ ...partial, room });
    },
    [applyVisualFilters],
  );

  const handleColorSelect = useCallback(
    (partial: Partial<ProductFilters>, color: VisualColorId | null) => {
      applyVisualFilters(partial);
    },
    [applyVisualFilters],
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <RoomSelector
          activeRoom={filters.room ?? null}
          onSelect={handleRoomSelect}
        />
        <ColorSelector
          activeColor={filters.visualColor ?? null}
          onSelect={handleColorSelect}
        />
        <BestSellersSection />
      </div>

      <div
        id="catalog-grid"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-8 sm:px-8 lg:px-12"
      >
        <h2 className="mb-8 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Catálogo completo
          <span className="ml-2 text-base font-normal text-muted">
            ({filtered.length} modelos)
          </span>
        </h2>

        <div className="grid gap-10 xl:grid-cols-[320px_1fr]">
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <CatalogFilters
              filters={filters}
              onChange={setFilters}
              total={filtered.length}
            />
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl bg-white py-24 text-center">
                <p className="text-muted">No hay modelos con estos filtros.</p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CompareBar />
    </>
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
