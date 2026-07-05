import type { CSSProperties } from "react";
import type { VinylFloorCategory } from "@/data/floor-images";

/**
 * Placeholders CSS del catálogo — SOLO texturas de suelo vinílico/PVC.
 *
 * Cada categoría simula lamas, vetas o patrones de pavimento.
 * variant 0–3 cambia escala/ángulo para la galería (misma familia de color).
 *
 * Para sustituir por fotos reales de fabricante en el futuro:
 * edita src/data/floor-images.ts → textureToken() y FloorImage.tsx
 */

type TextureConfig = {
  /** Descripción manual para revisión */
  description: string;
  style: CSSProperties;
};

function woodPlank(
  base: string,
  mid: string,
  dark: string,
  plankW: number,
  angle = 0,
): CSSProperties {
  return {
    backgroundColor: base,
    backgroundImage: `
      repeating-linear-gradient(
        ${90 + angle}deg,
        ${mid} 0px,
        ${mid} ${plankW - 2}px,
        ${dark} ${plankW - 2}px,
        ${dark} ${plankW}px
      ),
      repeating-linear-gradient(
        ${12 + angle}deg,
        transparent 0px,
        transparent 18px,
        rgba(0,0,0,0.04) 18px,
        rgba(0,0,0,0.04) 19px,
        transparent 19px,
        transparent 42px
      ),
      linear-gradient(${165 + angle}deg, ${base} 0%, ${mid} 55%, ${dark} 100%)
    `,
    backgroundSize: `${plankW}px 100%, 100% 100%, 100% 100%`,
  };
}

function herringbone(base: string, light: string, dark: string): CSSProperties {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
      <rect width="56" height="56" fill="${base}"/>
      <path d="M0 28 L14 14 L28 28 L14 42 Z" fill="${light}" stroke="${dark}" stroke-width="0.6"/>
      <path d="M28 0 L42 14 L56 0 L42 14 L28 28 Z" fill="${light}" stroke="${dark}" stroke-width="0.6" opacity="0.9"/>
      <path d="M28 28 L42 42 L56 28 L42 14 Z" fill="${light}" stroke="${dark}" stroke-width="0.6"/>
      <path d="M0 28 L14 42 L28 28 L14 14 Z" fill="${light}" stroke="${dark}" stroke-width="0.6" opacity="0.85"/>
    </svg>`,
  );
  return {
    backgroundColor: base,
    backgroundImage: `url("data:image/svg+xml,${svg}")`,
    backgroundSize: "56px 56px",
  };
}

function stoneTexture(base: string, speck1: string, speck2: string): CSSProperties {
  return {
    backgroundColor: base,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, ${speck1} 0%, transparent 8%),
      radial-gradient(circle at 70% 60%, ${speck2} 0%, transparent 6%),
      radial-gradient(circle at 45% 80%, ${speck1} 0%, transparent 7%),
      radial-gradient(circle at 85% 20%, ${speck2} 0%, transparent 5%),
      radial-gradient(circle at 10% 70%, ${speck2} 0%, transparent 4%),
      linear-gradient(160deg, ${base} 0%, ${speck1} 100%)
    `,
  };
}

function concreteTexture(base: string, patch: string, shadow: string): CSSProperties {
  return {
    backgroundColor: base,
    backgroundImage: `
      radial-gradient(ellipse at 30% 40%, ${patch} 0%, transparent 50%),
      radial-gradient(ellipse at 75% 65%, ${shadow} 0%, transparent 45%),
      radial-gradient(ellipse at 55% 15%, ${patch} 0%, transparent 40%),
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 3px,
        rgba(0,0,0,0.03) 3px,
        rgba(0,0,0,0.03) 4px
      ),
      linear-gradient(180deg, ${base} 0%, ${patch} 100%)
    `,
  };
}

function greyVinyl(base: string, line: string, accent: string, plankW: number): CSSProperties {
  return {
    backgroundColor: base,
    backgroundImage: `
      repeating-linear-gradient(
        90deg,
        ${base} 0px,
        ${base} ${plankW - 1}px,
        ${line} ${plankW - 1}px,
        ${line} ${plankW}px
      ),
      repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 24px,
        ${accent} 24px,
        ${accent} 25px
      ),
      linear-gradient(180deg, ${base} 0%, ${line} 100%)
    `,
    backgroundSize: `${plankW}px 100%, 100% 100%, 100% 100%`,
  };
}

/** Mapa validado — cada entrada es una textura de suelo, nunca decoración ni interiores */
export const TEXTURE_CONFIG: Record<VinylFloorCategory, TextureConfig> = {
  // ── ROBLE CLARO: lamas vinílicas madera clara, vetas suaves ──
  "roble-claro": {
    description: "Roble claro — lamas PVC tono miel / arena",
    style: woodPlank("#e8d5b5", "#dcc9a3", "#c9b088", 80),
  },
  // ── ROBLE MEDIO: roble natural intermedio ──
  "roble-medio": {
    description: "Roble medio — lamas PVC tono roble natural",
    style: woodPlank("#c4a574", "#b8956a", "#9a7b52", 76),
  },
  // ── ROBLE OSCURO: madera oscura, vetas profundas ──
  "roble-oscuro": {
    description: "Roble oscuro — lamas PVC tono café / roble viejo",
    style: woodPlank("#7a5c3e", "#6b4f34", "#523d28", 74),
  },
  // ── GRIS CLARO: vinilo gris perla ──
  "gris-claro": {
    description: "Gris claro — lamas vinílicas gris perla",
    style: greyVinyl("#d8dde2", "#c5ccd3", "rgba(255,255,255,0.15)", 78),
  },
  // ── GRIS MEDIO: vinilo gris neutro ──
  "gris-medio": {
    description: "Gris medio — lamas vinílicas gris cemento",
    style: greyVinyl("#a8afb8", "#959da6", "rgba(255,255,255,0.1)", 76),
  },
  // ── GRIS OSCURO: vinilo gris antracita ──
  "gris-oscuro": {
    description: "Gris oscuro — lamas vinílicas antracita",
    style: greyVinyl("#5c636b", "#4a5158", "rgba(255,255,255,0.06)", 74),
  },
  // ── ESPIGA CLARA: patrón herringbone roble claro ──
  "espiga-clara": {
    description: "Espiga clara — patrón espiga roble claro",
    style: herringbone("#e0cfa8", "#ead9b8", "#b89a72"),
  },
  // ── ESPIGA OSCURA: patrón herringbone roble oscuro ──
  "espiga-oscura": {
    description: "Espiga oscura — patrón espiga nogal / ébano",
    style: herringbone("#5c4030", "#6e5040", "#3d2a1e"),
  },
  // ── PIEDRA BEIGE: vinilo efecto piedra caliza ──
  "piedra-beige": {
    description: "Piedra beige — vinilo efecto caliza / travertino",
    style: stoneTexture("#ddd5c8", "#cfc4b4", "#c2b6a4"),
  },
  // ── PIEDRA GRIS: vinilo efecto pizarra gris ──
  "piedra-gris": {
    description: "Piedra gris — vinilo efecto pizarra / slate",
    style: stoneTexture("#b0b5ba", "#9da3a9", "#8a9198"),
  },
  // ── HORMIGÓN CLARO: vinilo efecto microcemento claro ──
  "hormigon-claro": {
    description: "Hormigón claro — vinilo efecto microcemento claro",
    style: concreteTexture("#d4d2ce", "#e2e0dc", "#b8b5b0"),
  },
  // ── HORMIGÓN OSCURO: vinilo efecto cemento pulido oscuro ──
  "hormigon-oscuro": {
    description: "Hormigón oscuro — vinilo efecto cemento antracita",
    style: concreteTexture("#6e6e6e", "#7d7d7d", "#555555"),
  },
  // ── NOGAL: lamas vinílicas nogal / walnut ──
  nogal: {
    description: "Nogal — lamas PVC tono nogal / walnut",
    style: woodPlank("#6b4a32", "#5c3f2b", "#452e1f", 72),
  },
  // ── BLANCO NÓRDICO: vinilo blanco roble nórdico ──
  "blanco-nordico": {
    description: "Blanco nórdico — lamas vinílicas blanco roble escandinavo",
    style: woodPlank("#f0ebe3", "#e5dfd6", "#d5cec3", 82),
  },
  // ── NEGRO PREMIUM: vinilo negro / wenge ──
  "negro-premium": {
    description: "Negro premium — lamas vinílicas negro / wenge",
    style: woodPlank("#2a2420", "#1f1b18", "#141110", 70),
  },
};

export function getTextureStyle(
  category: VinylFloorCategory,
  variant: number,
): CSSProperties {
  const config = TEXTURE_CONFIG[category] ?? TEXTURE_CONFIG["roble-claro"];
  const v = variant % 4;

  if (v === 0) return config.style;

  const base = { ...config.style };

  if (category.startsWith("espiga")) {
    return {
      ...base,
      backgroundSize: v === 1 ? "48px 48px" : v === 2 ? "64px 64px" : "52px 52px",
      filter: v === 3 ? "brightness(0.92)" : undefined,
    };
  }

  if (category.startsWith("piedra") || category.startsWith("hormigon")) {
    return {
      ...base,
      filter:
        v === 1 ? "brightness(1.05)" : v === 2 ? "brightness(0.95)" : "contrast(1.08)",
    };
  }

  const plankWidths = [80, 68, 88, 72];
  const angles = [0, 2, -1, 3];
  const colors = extractWoodColors(category);
  if (colors) {
    return woodPlank(colors.base, colors.mid, colors.dark, plankWidths[v], angles[v]);
  }

  return {
    ...base,
    filter: v === 1 ? "brightness(1.04)" : v === 2 ? "brightness(0.96)" : "saturate(1.1)",
  };
}

function extractWoodColors(
  category: VinylFloorCategory,
): { base: string; mid: string; dark: string } | null {
  const map: Partial<
    Record<VinylFloorCategory, { base: string; mid: string; dark: string }>
  > = {
    "roble-claro": { base: "#e8d5b5", mid: "#dcc9a3", dark: "#c9b088" },
    "roble-medio": { base: "#c4a574", mid: "#b8956a", dark: "#9a7b52" },
    "roble-oscuro": { base: "#7a5c3e", mid: "#6b4f34", dark: "#523d28" },
    nogal: { base: "#6b4a32", mid: "#5c3f2b", dark: "#452e1f" },
    "blanco-nordico": { base: "#f0ebe3", mid: "#e5dfd6", dark: "#d5cec3" },
    "negro-premium": { base: "#2a2420", mid: "#1f1b18", dark: "#141110" },
  };
  return map[category] ?? null;
}

export function getTextureLabel(category: VinylFloorCategory): string {
  return TEXTURE_CONFIG[category]?.description ?? "Textura vinílica";
}
