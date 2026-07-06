"use client";

import { SlidersHorizontal } from "lucide-react";
import type {
  ColorTone,
  ProductFilters,
  ProductFormat,
  UsageType,
} from "@/types/product";
import { getUniqueAcabados } from "@/lib/products";
import { ROOM_OPTIONS, type RoomId } from "@/data/catalog-visual";

type CatalogFiltersProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
};

function toggleFilter<T>(current: T[] | undefined, value: T): T[] {
  const list = current ?? [];
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/80 pb-6 last:border-0 last:pb-0">
      <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}

const colorOptions: { value: ColorTone; label: string }[] = [
  { value: "claro", label: "Claro" },
  { value: "medio", label: "Medio" },
  { value: "oscuro", label: "Oscuro" },
];

const formatoOptions: { value: ProductFormat; label: string }[] = [
  { value: "estandar", label: "Lama estándar" },
  { value: "xl", label: "Lama XL" },
  { value: "compact", label: "Compact" },
];

const roomToUso: Record<RoomId, UsageType> = {
  salon: "vivienda",
  cocina: "cocina",
  dormitorio: "vivienda",
  bano: "bano",
};

export default function CatalogFilters({
  filters,
  onChange,
}: CatalogFiltersProps) {
  const acabados = getUniqueAcabados()
    .slice(0, 10)
    .map((a) => ({
      value: a,
      label: a.length > 22 ? `${a.slice(0, 20)}…` : a,
    }));

  const hasFilters =
    filters.color?.length ||
    filters.acabado?.length ||
    filters.formato?.length ||
    filters.room ||
    filters.visualColor ||
    filters.patternCategory?.length ||
    filters.search?.trim();

  const clearAll = () =>
    onChange({
      sort: filters.sort,
      search: "",
      visualColor: null,
      room: null,
      patternCategory: undefined,
      color: undefined,
      acabado: undefined,
      formato: undefined,
      uso: undefined,
    });

  return (
    <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted" aria-hidden />
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Filtros
        </h3>
      </div>

      <div className="space-y-6">
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((opt) => {
              const active = filters.color?.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      color: toggleFilter(filters.color, opt.value),
                    })
                  }
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                    active
                      ? "bg-foreground text-white"
                      : "bg-surface text-muted hover:bg-border/60 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {acabados.length > 0 && (
          <FilterSection title="Acabado">
            <div className="flex flex-wrap gap-2">
              {acabados.map((opt) => {
                const active = filters.acabado?.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...filters,
                        acabado: toggleFilter(filters.acabado, opt.value),
                      })
                    }
                    className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                      active
                        ? "bg-foreground text-white"
                        : "bg-surface text-muted hover:bg-border/60 hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Estancia">
          <div className="grid grid-cols-2 gap-2">
            {ROOM_OPTIONS.map((room) => {
              const active = filters.room === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    if (active) {
                      onChange({ ...filters, uso: undefined, room: null });
                    } else {
                      onChange({
                        ...filters,
                        uso: [roomToUso[room.id]],
                        room: room.id,
                      });
                    }
                  }}
                  className={`rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                    active
                      ? "bg-foreground text-white"
                      : "bg-surface text-muted hover:bg-border/60 hover:text-foreground"
                  }`}
                >
                  {room.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Formato">
          <div className="flex flex-col gap-2">
            {formatoOptions.map((opt) => {
              const active = filters.formato?.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      formato: toggleFilter(filters.formato, opt.value),
                    })
                  }
                  className={`rounded-xl px-4 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                    active
                      ? "bg-foreground text-white"
                      : "bg-surface text-muted hover:bg-border/60 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="mt-6 w-full rounded-xl border border-border py-2.5 text-xs font-medium text-muted transition hover:border-foreground/20 hover:text-foreground"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
