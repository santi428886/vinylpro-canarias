export type CalculatorInput = {
  metros: number;
  precioM2: number;
  rodapie: boolean;
  retirarSuelo: boolean;
};

export type CalculatorResult = {
  subtotalMaterial: number;
  instalacion: number;
  rodapieCost: number;
  retiradaCost: number;
  total: number;
  precioM2Efectivo: number;
};

const INSTALACION_INCLUDED = true;
const RODAPIE_PRICE_PER_M = 8.5;
const RODAPIE_ESTIMATE_METERS = 0.4; // ~40cm perimeter per m²
const RETIRADA_PRICE_PER_M2 = 4.5;

export function calculateEstimate(input: CalculatorInput): CalculatorResult {
  const { metros, precioM2, rodapie, retirarSuelo } = input;

  const subtotalMaterial = metros * precioM2;
  const instalacion = INSTALACION_INCLUDED ? 0 : metros * 6;
  const rodapieCost = rodapie
    ? Math.ceil(metros * RODAPIE_ESTIMATE_METERS) * RODAPIE_PRICE_PER_M
    : 0;
  const retiradaCost = retirarSuelo ? metros * RETIRADA_PRICE_PER_M2 : 0;
  const total = subtotalMaterial + instalacion + rodapieCost + retiradaCost;
  const precioM2Efectivo = metros > 0 ? total / metros : precioM2;

  return {
    subtotalMaterial,
    instalacion,
    rodapieCost,
    retiradaCost,
    total,
    precioM2Efectivo,
  };
}

export function formatEuro(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}
