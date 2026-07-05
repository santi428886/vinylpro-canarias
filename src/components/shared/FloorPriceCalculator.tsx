"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/constants";
import {
  buildFloorEstimateWhatsAppMessage,
  calculateFloorInstallTotal,
  FLOOR_INSTALL_INCLUDES,
  FLOOR_INSTALL_PRICE_PER_M2,
  formatEstimatedTotal,
  formatPricePerM2,
  formatSquareMeters,
  parseSquareMeters,
} from "@/lib/floor-price-calculator";

type FloorPriceCalculatorProps = {
  className?: string;
};

export default function FloorPriceCalculator({
  className = "",
}: FloorPriceCalculatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const [input, setInput] = useState("");
  const [resultMetros, setResultMetros] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const metros = parseSquareMeters(input);
    if (metros === null) {
      setError("Introduce una superficie válida mayor que 0 (ej. 25 o 32,5).");
      setResultMetros(null);
      return;
    }
    setError(null);
    setResultMetros(metros);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (error) setError(null);
  };

  const total =
    resultMetros !== null
      ? calculateFloorInstallTotal(resultMetros)
      : null;

  const resultMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div
      className={`rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:p-10 ${className}`}
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Calcula el precio de tu nuevo suelo
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Introduce los metros cuadrados y obtén un presupuesto orientativo al
          instante.
        </p>
      </div>

      <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm">
        {FLOOR_INSTALL_INCLUDES.map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 max-w-md">
        <label htmlFor="floor-metros" className="sr-only">
          Metros cuadrados
        </label>
        <div className="flex items-center justify-center gap-3">
          <input
            id="floor-metros"
            type="text"
            inputMode="decimal"
            placeholder="25"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCalculate();
            }}
            className="w-28 rounded-2xl border border-border bg-surface px-4 py-3.5 text-center text-2xl font-semibold tabular-nums text-foreground outline-none transition focus:border-foreground/25 focus:ring-2 focus:ring-foreground/5 sm:w-32 sm:text-3xl"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "floor-metros-error" : undefined}
          />
          <span className="text-lg font-medium text-muted sm:text-xl">m²</span>
        </div>

        {error && (
          <p
            id="floor-metros-error"
            role="alert"
            className="mt-3 text-center text-sm text-rose-600"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-6 w-full rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-white transition hover:bg-foreground/90"
        >
          Calcular presupuesto
        </button>
      </div>

      <AnimatePresence mode="wait">
        {resultMetros !== null && total !== null && (
          <motion.div
            key={resultMetros}
            {...resultMotion}
            className="mx-auto mt-8 max-w-md rounded-2xl border border-border/80 bg-surface/60 p-6 sm:p-8"
          >
            <dl className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-muted">Superficie</dt>
                <dd className="text-base font-semibold tabular-nums text-foreground">
                  {formatSquareMeters(resultMetros)} m²
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-muted">Precio por m²</dt>
                <dd className="text-base font-semibold text-foreground">
                  {formatPricePerM2(FLOOR_INSTALL_PRICE_PER_M2)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-border/80 pt-4">
                <dt className="text-sm font-medium text-foreground">
                  Total estimado
                </dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground">
                  {formatEstimatedTotal(total)}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-muted sm:text-sm">
              Precio orientativo con materiales e instalación incluidos. El
              presupuesto definitivo puede variar tras la visita técnica.
            </p>

            <Button
              href={buildWhatsAppUrl(
                buildFloorEstimateWhatsAppMessage(resultMetros),
              )}
              variant="whatsapp"
              size="lg"
              external
              className="mt-6 w-full"
            >
              Solicitar presupuesto gratuito
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
