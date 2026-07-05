export const WHATSAPP_NUMBER = "34600000000";

export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola VinylPro Canarias, me gustaría pedir presupuesto para instalación de suelo vinílico en Gran Canaria.";
