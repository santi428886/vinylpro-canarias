"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Ruler } from "lucide-react";
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
  getEstimatedInstallTime,
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
  const [zone, setZone] = useState("");
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
    resultMetros !== null ? calculateFloorInstallTotal(resultMetros) : null;

  const installTime =
    resultMetros !== null ? getEstimatedInstallTime(resultMetros) : null;

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
      className={`overflow-hidden rounded-3xl border border-border bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="border-b border-border/60 bg-gradient-to-b from-surface/80 to-white px-6 py-8 text-center sm:px-10 sm:py-10">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Calcula el precio de tu nuevo suelo
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Introduce los metros cuadrados y obtén un presupuesto orientativo al
          instante.
        </p>
        <p className="mx-auto mt-5 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5 text-sm font-semibold tracking-tight text-accent-dark sm:text-base">
          Desde {formatPricePerM2(FLOOR_INSTALL_PRICE_PER_M2)}/m² con material e
          instalación incluidos
        </p>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <ul className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm">
          {FLOOR_INSTALL_INCLUDES.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 max-w-md space-y-5">
          <div>
            <label
              htmlFor="floor-metros"
              className="mb-2 block text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
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
                className="w-32 rounded-2xl border border-border bg-surface px-4 py-4 text-center text-3xl font-semibold tabular-nums text-foreground outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/15 sm:w-36"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "floor-metros-error" : undefined}
              />
              <span className="text-xl font-medium text-muted">m²</span>
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
          </div>

          <div>
            <label
              htmlFor="floor-zona"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              Nombre o zona{" "}
              <span className="font-normal normal-case tracking-normal text-muted/70">
                (opcional)
              </span>
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                id="floor-zona"
                type="text"
                placeholder="Las Palmas, Telde, Valsequillo…"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent/40 focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full rounded-full bg-foreground px-6 py-4 text-sm font-semibold text-white transition hover:bg-foreground/90"
          >
            Calcular presupuesto
          </button>
        </div>

        <AnimatePresence mode="wait">
          {resultMetros !== null && total !== null && installTime !== null && (
            <motion.div
              key={`${resultMetros}-${zone}`}
              {...resultMotion}
              className="mx-auto mt-8 max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-foreground text-white"
            >
              <div className="px-6 py-8 text-center sm:px-8 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Total estimado
                </p>
                <p className="mt-2 text-5xl font-semibold tracking-tight sm:text-6xl">
                  {formatEstimatedTotal(total)}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {formatSquareMeters(resultMetros)} m² ·{" "}
                  {formatPricePerM2(FLOOR_INSTALL_PRICE_PER_M2)}/m²
                </p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-white/5">
                <div className="px-3 py-5 text-center sm:px-4">
                  <Ruler
                    className="mx-auto h-4 w-4 text-accent-light"
                    aria-hidden
                  />
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
                    Superficie
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums sm:text-base">
                    {formatSquareMeters(resultMetros)} m²
                  </p>
                </div>
                <div className="px-3 py-5 text-center sm:px-4">
                  <span
                    className="mx-auto block text-sm font-bold text-accent-light"
                    aria-hidden
                  >
                    €
                  </span>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
                    Por m²
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:text-base">
                    {formatPricePerM2(FLOOR_INSTALL_PRICE_PER_M2)}
                  </p>
                </div>
                <div className="px-3 py-5 text-center sm:px-4">
                  <Clock
                    className="mx-auto h-4 w-4 text-accent-light"
                    aria-hidden
                  />
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-white/50">
                    Instalación
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:text-base">
                    {installTime}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 px-6 py-5 sm:px-8">
                <p className="text-center text-xs leading-relaxed text-white/60 sm:text-sm">
                  Precio orientativo con materiales e instalación incluidos. El
                  presupuesto definitivo puede variar tras la visita técnica.
                </p>
                <Button
                  href={buildWhatsAppUrl(
                    buildFloorEstimateWhatsAppMessage(
                      resultMetros,
                      total,
                      zone,
                    ),
                  )}
                  variant="whatsapp"
                  size="lg"
                  external
                  className="mt-5 w-full"
                >
                  Solicitar presupuesto gratuito
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
