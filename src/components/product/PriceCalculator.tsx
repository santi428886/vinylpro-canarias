"use client";

import { useState } from "react";
import {
  calculateEstimate,
  formatEuro,
} from "@/lib/calculator";
import { buildWhatsAppUrl } from "@/lib/constants";

type PriceCalculatorProps = {
  precioM2: number;
  productName?: string;
};

export default function PriceCalculator({
  precioM2,
  productName,
}: PriceCalculatorProps) {
  const [metros, setMetros] = useState(30);
  const [rodapie, setRodapie] = useState(false);
  const [retirarSuelo, setRetirarSuelo] = useState(false);

  const result = calculateEstimate({
    metros,
    precioM2,
    rodapie,
    retirarSuelo,
  });

  const whatsappMessage = productName
    ? `Hola VinylPro Canarias, quiero presupuesto para "${productName}" en ${metros} m²${rodapie ? " con rodapié" : ""}${retirarSuelo ? " y retirada de suelo anterior" : ""}. Estimación: ${formatEuro(result.total)}.`
    : `Hola VinylPro Canarias, quiero presupuesto para ${metros} m²${rodapie ? " con rodapié" : ""}${retirarSuelo ? " y retirada de suelo anterior" : ""}. Estimación: ${formatEuro(result.total)}.`;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">
        Calculadora de presupuesto
      </h3>
      <p className="mt-1 text-sm text-muted">
        Estimación orientativa. El precio final puede variar según el estado del
        pavimento.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="metros" className="mb-2 block text-sm font-medium">
            Metros cuadrados
          </label>
          <input
            id="metros"
            type="number"
            min={1}
            max={500}
            value={metros}
            onChange={(e) => setMetros(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={rodapie}
            onChange={(e) => setRodapie(e.target.checked)}
            className="h-4 w-4 rounded accent-accent"
          />
          <span className="text-sm text-foreground">¿Incluir rodapié?</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={retirarSuelo}
            onChange={(e) => setRetirarSuelo(e.target.checked)}
            className="h-4 w-4 rounded accent-accent"
          />
          <span className="text-sm text-foreground">
            ¿Retirar suelo anterior?
          </span>
        </label>
      </div>

      <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
        <div className="flex justify-between text-muted">
          <span>Material + instalación ({metros} m²)</span>
          <span>{formatEuro(result.subtotalMaterial)}</span>
        </div>
        {result.rodapieCost > 0 && (
          <div className="flex justify-between text-muted">
            <span>Rodapié estimado</span>
            <span>{formatEuro(result.rodapieCost)}</span>
          </div>
        )}
        {result.retiradaCost > 0 && (
          <div className="flex justify-between text-muted">
            <span>Retirada de suelo</span>
            <span>{formatEuro(result.retiradaCost)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 text-lg font-semibold text-foreground">
          <span>Total estimado</span>
          <span>{formatEuro(result.total)}</span>
        </div>
        <p className="text-xs text-muted">
          ≈ {formatEuro(result.precioM2Efectivo)}/m² efectivo
        </p>
      </div>

      <a
        href={buildWhatsAppUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
      >
        Solicitar presupuesto exacto
      </a>
    </div>
  );
}
