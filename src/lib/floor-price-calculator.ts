/** Precio cerrado por m² con material e instalación incluidos */
export const FLOOR_INSTALL_PRICE_PER_M2 = 39;

export const FLOOR_INSTALL_INCLUDES = [
  "Suelo vinílico premium",
  "Materiales",
  "Base si es necesaria",
  "Instalación",
  "Remates",
  "Mano de obra",
] as const;

export function calculateFloorInstallTotal(metros: number): number {
  return metros * FLOOR_INSTALL_PRICE_PER_M2;
}

/** Acepta enteros y decimales con coma o punto (ej. 32,5) */
export function parseSquareMeters(input: string): number | null {
  const normalized = input.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized || !/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function formatSquareMeters(metros: number): string {
  const hasDecimals = !Number.isInteger(metros);
  return metros.toLocaleString("es-ES", {
    minimumFractionDigits: hasDecimals ? 1 : 0,
    maximumFractionDigits: 1,
  });
}

export function formatPricePerM2(value: number): string {
  return `${value.toLocaleString("es-ES")} €`;
}

export function formatEstimatedTotal(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function buildFloorEstimateWhatsAppMessage(metros: number): string {
  const formatted = formatSquareMeters(metros);
  return `Hola, quiero un presupuesto para instalar aproximadamente ${formatted} m² de suelo vinílico.`;
}
