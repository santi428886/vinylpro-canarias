"use client";

import type {
  ColorTone,
  FloorType,
  ProductFilters,
  SortOption,
  UsageType,
} from "@/types/product";

type CatalogFiltersProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  total: number;
};

const colorOptions: { value: ColorTone; label: string }[] = [
  { value: "claro", label: "Claro" },
  { value: "medio", label: "Medio" },
  { value: "oscuro", label: "Oscuro" },
];

const typeOptions: { value: FloorType; label: string }[] = [
  { value: "roble", label: "Roble" },
  { value: "espiga", label: "Espiga" },
  { value: "piedra", label: "Piedra" },
  { value: "hormigon", label: "Hormigón" },
];

const usageOptions: { value: UsageType; label: string }[] = [
  { value: "vivienda", label: "Vivienda" },
  { value: "bano", label: "Baño" },
  { value: "cocina", label: "Cocina" },
  { value: "local", label: "Local comercial" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularidad", label: "Popularidad" },
  { value: "precio", label: "Precio" },
  { value: "nombre", label: "Nombre" },
];

function toggleFilter<T>(current: T[] | undefined, value: T): T[] {
  const list = current ?? [];
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { value: T; label: string }[];
  selected?: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected?.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                active
                  ? "bg-foreground text-white"
                  : "bg-surface text-muted hover:bg-border"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CatalogFilters({
  filters,
  onChange,
  total,
}: CatalogFiltersProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          {total} modelos encontrados
        </p>
        <select
          value={filters.sort ?? "popularidad"}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Ordenar: {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-5">
        <FilterGroup
          title="Color"
          options={colorOptions}
          selected={filters.color}
          onToggle={(v) =>
            onChange({ ...filters, color: toggleFilter(filters.color, v) })
          }
        />
        <FilterGroup
          title="Tipo"
          options={typeOptions}
          selected={filters.tipo}
          onToggle={(v) =>
            onChange({ ...filters, tipo: toggleFilter(filters.tipo, v) })
          }
        />
        <FilterGroup
          title="Uso"
          options={usageOptions}
          selected={filters.uso}
          onToggle={(v) =>
            onChange({ ...filters, uso: toggleFilter(filters.uso, v) })
          }
        />
      </div>

      {(filters.color?.length ||
        filters.tipo?.length ||
        filters.uso?.length) && (
        <button
          type="button"
          onClick={() => onChange({ sort: filters.sort })}
          className="mt-5 text-xs font-medium text-accent hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
