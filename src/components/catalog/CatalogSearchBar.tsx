"use client";

import { Search, X } from "lucide-react";
import type { SortOption } from "@/types/product";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularidad", label: "Popularidad" },
  { value: "precio", label: "Precio" },
  { value: "nombre", label: "Nombre" },
];

type CatalogSearchBarProps = {
  search: string;
  sort: SortOption;
  total: number;
  onSearchChange: (value: string) => void;
  onSortChange: (sort: SortOption) => void;
};

export default function CatalogSearchBar({
  search,
  sort,
  total,
  onSearchChange,
  onSortChange,
}: CatalogSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-md">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar modelo, color o acabado…"
          aria-label="Buscar en el catálogo"
          className="w-full rounded-full border border-border bg-white py-3.5 pl-11 pr-11 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted/70 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/5"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Borrar búsqueda"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className="text-sm tabular-nums text-muted">
          <span className="font-medium text-foreground">{total}</span> modelos
        </p>
        <div
          className="flex rounded-full border border-border bg-white p-1 shadow-sm"
          role="group"
          aria-label="Ordenar catálogo"
        >
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSortChange(opt.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                sort === opt.value
                  ? "bg-foreground text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
