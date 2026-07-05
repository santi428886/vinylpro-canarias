"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, X } from "lucide-react";
import { useCatalogExperience } from "@/context/CatalogExperienceContext";
import { getProductsBySlugs } from "@/lib/products";
import { formatEuro } from "@/lib/calculator";
import { getSistemaLabel } from "@/lib/product-enrichment";
import StarRating from "./StarRating";

export default function CompareBar() {
  const { compareList, clearCompare } = useCatalogExperience();
  const [open, setOpen] = useState(false);
  const products = getProductsBySlugs(compareList);

  if (compareList.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-foreground/90"
        >
          <GitCompareArrows className="h-4 w-4" />
          Comparar modelos ({compareList.length}/3)
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
          >
            <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="relative w-full max-w-6xl rounded-3xl bg-white p-6 sm:p-10"
              >
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setOpen(false)}
                  className="absolute right-5 top-5 text-muted hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Comparar modelos
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Hasta 3 productos seleccionados
                </p>

                <div
                  className={`mt-8 grid gap-6 ${
                    products.length === 1
                      ? "grid-cols-1"
                      : products.length === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {products.map((p) => (
                    <div
                      key={p.slug}
                      className="overflow-hidden rounded-2xl border border-border"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={p.imagen}
                          alt={p.nombre}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground">
                          {p.nombre}
                        </h3>
                        <p className="mt-2 text-xl font-semibold">
                          {formatEuro(p.precio)}
                          <span className="text-sm font-normal text-muted">
                            {" "}
                            /m² inst.
                          </span>
                        </p>
                        <dl className="mt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted">Material</dt>
                            <dd>{formatEuro(p.precioMaterial)}/m²</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted">Grosor</dt>
                            <dd>{p.grosor}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted">Instalación</dt>
                            <dd>{getSistemaLabel(p.sistema)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted">Garantía</dt>
                            <dd>{p.garantia}</dd>
                          </div>
                        </dl>
                        <div className="mt-4 space-y-1 border-t border-border pt-4">
                          <StarRating
                            value={p.ratings.resistencia}
                            label="Resistencia"
                          />
                          <StarRating value={p.ratings.agua} label="Agua" />
                          <StarRating
                            value={p.ratings.mascotas}
                            label="Mascotas"
                          />
                          <StarRating value={p.ratings.ninos} label="Niños" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={clearCompare}
                    className="rounded-full px-5 py-2.5 text-sm font-medium text-muted hover:text-foreground"
                  >
                    Limpiar
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
