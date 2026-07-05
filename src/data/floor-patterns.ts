import type { CSSProperties } from "react";
import type { VinylFloorCategory } from "@/data/floor-images";

/** Gallery / hover views — textura principal, detalle de lama, tono instalado */
export type VinylFloorVariant = 0 | 1 | 2;

export const FLOOR_VARIANT_LABELS = [
  "Textura",
  "Vista de lama",
  "Tono instalado",
] as const;

type PatternConfig = {
  description: string;
  base: string;
  mid: string;
  dark: string;
  kind: "wood" | "herringbone" | "stone" | "concrete" | "grey";
};

export const PATTERN_CONFIG: Record<VinylFloorCategory, PatternConfig> = {
  "roble-claro": {
    description: "Roble claro — lamas PVC tono miel / arena",
    base: "#e8d5b5",
    mid: "#dcc9a3",
    dark: "#c9b088",
    kind: "wood",
  },
  "roble-medio": {
    description: "Roble medio — lamas PVC tono roble natural",
    base: "#c4a574",
    mid: "#b8956a",
    dark: "#9a7b52",
    kind: "wood",
  },
  "roble-oscuro": {
    description: "Roble oscuro — lamas PVC tono café / roble viejo",
    base: "#7a5c3e",
    mid: "#6b4f34",
    dark: "#523d28",
    kind: "wood",
  },
  nogal: {
    description: "Nogal — lamas PVC tono nogal / walnut",
    base: "#6b4a32",
    mid: "#5c3f2b",
    dark: "#452e1f",
    kind: "wood",
  },
  "gris-claro": {
    description: "Gris claro — lamas vinílicas gris perla",
    base: "#d8dde2",
    mid: "#c5ccd3",
    dark: "#b0b8c0",
    kind: "grey",
  },
  "gris-oscuro": {
    description: "Gris oscuro — lamas vinílicas antracita",
    base: "#5c636b",
    mid: "#4a5158",
    dark: "#3a4047",
    kind: "grey",
  },
  "espiga-clara": {
    description: "Espiga clara — patrón espiga roble claro",
    base: "#e0cfa8",
    mid: "#ead9b8",
    dark: "#b89a72",
    kind: "herringbone",
  },
  "espiga-oscura": {
    description: "Espiga oscura — patrón espiga nogal / ébano",
    base: "#5c4030",
    mid: "#6e5040",
    dark: "#3d2a1e",
    kind: "herringbone",
  },
  "hormigon-claro": {
    description: "Hormigón claro — vinilo efecto microcemento claro",
    base: "#d4d2ce",
    mid: "#e2e0dc",
    dark: "#b8b5b0",
    kind: "concrete",
  },
  "hormigon-oscuro": {
    description: "Hormigón oscuro — vinilo efecto cemento antracita",
    base: "#6e6e6e",
    mid: "#7d7d7d",
    dark: "#555555",
    kind: "concrete",
  },
  "piedra-beige": {
    description: "Piedra beige — vinilo efecto caliza / travertino",
    base: "#ddd5c8",
    mid: "#cfc4b4",
    dark: "#c2b6a4",
    kind: "stone",
  },
  "piedra-gris": {
    description: "Piedra gris — vinilo efecto pizarra / slate",
    base: "#b0b5ba",
    mid: "#9da3a9",
    dark: "#8a9198",
    kind: "stone",
  },
  "blanco-nordico": {
    description: "Blanco nórdico — lamas vinílicas blanco roble escandinavo",
    base: "#f0ebe3",
    mid: "#e5dfd6",
    dark: "#d5cec3",
    kind: "wood",
  },
  "negro-premium": {
    description: "Negro premium — lamas vinílicas negro / wenge",
    base: "#2a2420",
    mid: "#1f1b18",
    dark: "#141110",
    kind: "wood",
  },
};

function woodPlankStyle(
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
        rgba(0,0,0,0.045) 18px,
        rgba(0,0,0,0.045) 19px,
        transparent 19px,
        transparent 42px
      ),
      linear-gradient(${165 + angle}deg, ${base} 0%, ${mid} 55%, ${dark} 100%)
    `,
    backgroundSize: `${plankW}px 100%, 100% 100%, 100% 100%`,
  };
}

function greyPlankStyle(
  base: string,
  line: string,
  accent: string,
  plankW: number,
): CSSProperties {
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

function herringboneStyle(base: string, light: string, dark: string): CSSProperties {
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

function stoneStyle(base: string, speck1: string, speck2: string): CSSProperties {
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

function concreteStyle(base: string, patch: string, shadow: string): CSSProperties {
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

function baseStyleForConfig(config: PatternConfig): CSSProperties {
  const { base, mid, dark, kind } = config;
  switch (kind) {
    case "wood":
      return woodPlankStyle(base, mid, dark, 78);
    case "grey":
      return greyPlankStyle(base, mid, "rgba(255,255,255,0.12)", 78);
    case "herringbone":
      return herringboneStyle(base, mid, dark);
    case "stone":
      return stoneStyle(base, mid, dark);
    case "concrete":
      return concreteStyle(base, mid, dark);
  }
}

/** Base CSS background per category + variant (0=textura, 1=lama, 2=tono instalado) */
export function getPatternStyle(
  category: VinylFloorCategory,
  variant: number,
): CSSProperties {
  const config = PATTERN_CONFIG[category] ?? PATTERN_CONFIG["roble-claro"];
  const v = (variant % 3) as VinylFloorVariant;

  if (v === 0) return baseStyleForConfig(config);

  if (config.kind === "herringbone") {
    const size = v === 1 ? "44px 44px" : "60px 60px";
    return {
      ...herringboneStyle(config.base, config.mid, config.dark),
      backgroundSize: size,
      filter: v === 2 ? "brightness(0.94) saturate(0.95)" : "brightness(1.03)",
    };
  }

  if (config.kind === "stone") {
    return {
      ...stoneStyle(config.base, config.mid, config.dark),
      filter: v === 1 ? "contrast(1.12) brightness(1.02)" : "brightness(0.93) saturate(0.9)",
      backgroundSize: v === 1 ? "120% 120%" : "100% 100%",
    };
  }

  if (config.kind === "concrete") {
    return {
      ...concreteStyle(config.base, config.mid, config.dark),
      filter: v === 1 ? "contrast(1.1)" : "brightness(0.92)",
    };
  }

  const plankWidths = [78, 52, 86];
  const angles = [0, 1, -2];
  if (config.kind === "grey") {
    return greyPlankStyle(config.base, config.mid, "rgba(255,255,255,0.1)", plankWidths[v]);
  }
  return woodPlankStyle(config.base, config.mid, config.dark, plankWidths[v], angles[v]);
}

export function getPatternLabel(category: VinylFloorCategory): string {
  return PATTERN_CONFIG[category]?.description ?? "Textura vinílica";
}

export function getVariantLabel(variant: number): string {
  return FLOOR_VARIANT_LABELS[variant % 3] ?? FLOOR_VARIANT_LABELS[0];
}
