"use client";

import type {
  CollectionTheme,
  ColorTone,
  FloorSystem,
  FloorType,
  PriceRange,
  ProductFilters,
  SortOption,
  UsageType,
} from "@/types/product";
import { COLLECTION_LABELS } from "@/types/product";
import { getUniqueAcabados } from "@/lib/products";

type CatalogFiltersProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  total: number;
};

function toggleFilter<T>(current: T[] | undefined, value: T): T[] {
  const list = current ?? [];
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function FilterPills<T extends string>({
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
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
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
              className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-foreground text-white shadow-md"
                  : "bg-white text-muted hover:bg-surface hover:text-foreground"
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
  { value: "local", label: "Local" },
];

const sistemaOptions: { value: FloorSystem; label: string }[] = [
  { value: "spc-click", label: "SPC Click" },
  { value: "adhesivo", label: "Adhesivo" },
  { value: "rollo", label: "En rollo" },
];

const collectionOptions: { value: CollectionTheme; label: string }[] = (
  Object.entries(COLLECTION_LABELS) as [CollectionTheme, string][]
).map(([value, label]) => ({ value, label }));

const priceOptions: { value: PriceRange; label: string }[] = [
  { value: "economico", label: "Económico" },
  { value: "medio", label: "Medio" },
  { value: "premium", label: "Premium" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularidad", label: "Popularidad" },
  { value: "precio", label: "Precio" },
  { value: "nombre", label: "Nombre" },
];

export default function CatalogFilters({
  filters,
  onChange,
  total,
}: CatalogFiltersProps) {
  const acabados = getUniqueAcabados().slice(0, 8).map((a) => ({
    value: a,
    label: a.length > 20 ? `${a.slice(0, 18)}…` : a,
  }));

  const hasFilters =
    filters.color?.length ||
    filters.tipo?.length ||
    filters.uso?.length ||
    filters.sistema?.length ||
    filters.coleccion?.length ||
    filters.acabado?.length ||
    filters.precioRange?.length;

  return (
    <div className="space-y-8 rounded-3xl border border-border bg-surface/50 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-foreground">
          {total} modelos
        </p>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...filters, sort: opt.value })}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                (filters.sort ?? "popularidad") === opt.value
                  ? "bg-accent text-white"
                  : "bg-white text-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <FilterPills
        title="Colección"
        options={collectionOptions}
        selected={filters.coleccion}
        onToggle={(v) =>
          onChange({ ...filters, coleccion: toggleFilter(filters.coleccion, v) })
        }
      />

      <FilterPills
        title="Color"
        options={colorOptions}
        selected={filters.color}
        onToggle={(v) =>
          onChange({ ...filters, color: toggleFilter(filters.color, v) })
        }
      />

      <FilterPills
        title="Tipo"
        options={typeOptions}
        selected={filters.tipo}
        onToggle={(v) =>
          onChange({ ...filters, tipo: toggleFilter(filters.tipo, v) })
        }
      />

      <FilterPills
        title="Habitaciones"
        options={usageOptions}
        selected={filters.uso}
        onToggle={(v) =>
          onChange({ ...filters, uso: toggleFilter(filters.uso, v) })
        }
      />

      <FilterPills
        title="Precio"
        options={priceOptions}
        selected={filters.precioRange}
        onToggle={(v) =>
          onChange({
            ...filters,
            precioRange: toggleFilter(filters.precioRange, v),
          })
        }
      />

      <FilterPills
        title="Sistema"
        options={sistemaOptions}
        selected={filters.sistema}
        onToggle={(v) =>
          onChange({ ...filters, sistema: toggleFilter(filters.sistema, v) })
        }
      />

      {acabados.length > 0 && (
        <FilterPills
          title="Acabado"
          options={acabados}
          selected={filters.acabado}
          onToggle={(v) =>
            onChange({ ...filters, acabado: toggleFilter(filters.acabado, v) })
          }
        />
      )}

      {hasFilters && (
        <button
          type="button"
          onClick={() => onChange({ sort: filters.sort })}
          className="text-sm font-medium text-accent hover:underline"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  );
}
