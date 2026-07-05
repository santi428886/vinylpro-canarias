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

export function getEstimatedInstallTime(metros: number): string {
  if (metros <= 30) return "1 día";
  if (metros <= 70) return "2 días";
  return "3-4 días";
}

export function buildFloorEstimateWhatsAppMessage(
  metros: number,
  total: number,
  zone?: string,
): string {
  const formattedMetros = formatSquareMeters(metros);
  const formattedTotal = formatEstimatedTotal(total);
  const time = getEstimatedInstallTime(metros);
  const zoneLine = zone?.trim()
    ? `\nZona: ${zone.trim()}`
    : "";

  return (
    `Hola, quiero un presupuesto para instalar suelo vinílico.\n` +
    `Superficie: ${formattedMetros} m²\n` +
    `Total estimado: ${formattedTotal}\n` +
    `Tiempo orientativo: ${time}${zoneLine}`
  );
}
