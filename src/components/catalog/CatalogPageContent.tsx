"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { allProducts, filterProducts } from "@/lib/products";
import type { FloorSystem, ProductFilters, SortOption } from "@/types/product";
import type { RoomId, VisualColorId } from "@/data/catalog-visual";
import CatalogFilters from "./CatalogFilters";
import CatalogSearchBar from "./CatalogSearchBar";
import ProductCard from "./ProductCard";
import CompareBar from "./CompareBar";
import RoomSelector from "./RoomSelector";
import ColorSelector from "./ColorSelector";
import BestSellersSection from "./BestSellersSection";

const VALID_SISTEMAS: FloorSystem[] = ["spc-click", "adhesivo", "rollo"];

function isValidSistema(value: string | null): value is FloorSystem {
  return value !== null && VALID_SISTEMAS.includes(value as FloorSystem);
}

export default function CatalogPageContent() {
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "popularidad",
    search: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sistema = params.get("sistema");
    if (isValidSistema(sistema)) {
      setFilters((prev) => ({ ...prev, sistema: [sistema] }));
    }
  }, []);

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
    (partial: Partial<ProductFilters>, _color: VisualColorId | null) => {
      applyVisualFilters(partial);
    },
    [applyVisualFilters],
  );

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
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
        className="border-t border-border/60 bg-[#fafaf9]"
      >
        <div className="sticky top-[72px] z-30 border-b border-border/60 bg-[#fafaf9]/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <CatalogSearchBar
              search={filters.search ?? ""}
              sort={filters.sort ?? "popularidad"}
              total={filtered.length}
              onSearchChange={handleSearchChange}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-24">
          <div className="grid gap-10 xl:grid-cols-[280px_1fr] xl:gap-12">
            <aside className="hidden xl:block">
              <div className="sticky top-36">
                <CatalogFilters filters={filters} onChange={setFilters} />
              </div>
            </aside>

            <div>
              <div className="mb-8 xl:hidden">
                <CatalogFilters filters={filters} onChange={setFilters} />
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-border/80 bg-white py-24 text-center">
                  <p className="text-muted">No hay modelos con estos filtros.</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({ sort: filters.sort ?? "popularidad", search: "" })
                    }
                    className="mt-4 text-sm font-medium text-accent hover:underline"
                  >
                    Limpiar búsqueda y filtros
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-2 2xl:grid-cols-3">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CompareBar />
    </>
  );
}
