import type { CSSProperties } from "react";
import type {
  CollectionTheme,
  ColorTone,
  FloorSystem,
  FloorType,
} from "@/types/product";

/**
 * Patrones CSS del catálogo — cero URLs externas.
 *
 * Roles de galería (máx. 3):
 *   installed → suelo instalado (principal)
 *   texture   → textura de lamas
 *   detail    → detalle de veta / patrón
 */

export type VinylFloorCategory =
  | "roble-claro"
  | "roble-medio"
  | "roble-oscuro"
  | "nogal"
  | "gris-claro"
  | "gris-oscuro"
  | "espiga-clara"
  | "espiga-oscura"
  | "hormigon-claro"
  | "hormigon-oscuro"
  | "piedra-beige"
  | "piedra-gris"
  | "blanco-nordico"
  | "negro-premium";

export type FloorGalleryRole = "installed" | "texture" | "detail";

export const GALLERY_ROLES: FloorGalleryRole[] = [
  "installed",
  "texture",
  "detail",
];

export const DEFAULT_PATTERN_CATEGORY: VinylFloorCategory = "roble-claro";

export function resolvePatternCategory(input: {
  tipo: FloorType;
  color: ColorTone;
  sistema: FloorSystem;
  nombre: string;
  acabado: string;
  coleccion: string;
  temaColeccion?: CollectionTheme;
}): VinylFloorCategory {
  const name = input.nombre.toLowerCase();
  const acabado = input.acabado.toLowerCase();
  const coleccion = input.coleccion.toLowerCase();

  if (input.tipo === "espiga") {
    return input.color === "oscuro" ? "espiga-oscura" : "espiga-clara";
  }

  if (input.tipo === "piedra") {
    if (
      name.includes("beige") ||
      name.includes("caliza") ||
      name.includes("arena") ||
      name.includes("marfil") ||
      name.includes("carrara") ||
      input.color === "claro"
    ) {
      return "piedra-beige";
    }
    return "piedra-gris";
  }

  if (input.tipo === "hormigon") {
    return input.color === "oscuro" ? "hormigon-oscuro" : "hormigon-claro";
  }

  if (
    name.includes("negro") ||
    name.includes("ébano") ||
    name.includes("ebano") ||
    name.includes("wenge")
  ) {
    return "negro-premium";
  }

  if (
    name.includes("nogal") ||
    name.includes("walnut") ||
    name.includes("cacao") ||
    name.includes("cognac")
  ) {
    return "nogal";
  }

  if (
    name.includes("blanco") ||
    name.includes("marfil") ||
    name.includes("perla") ||
    acabado.includes("blanco")
  ) {
    return "blanco-nordico";
  }

  if (name.includes("nórdico") || name.includes("nordico")) {
    return input.color === "oscuro" ? "gris-oscuro" : "blanco-nordico";
  }

  if (
    name.includes("gris") ||
    name.includes("grafito") ||
    name.includes("plata") ||
    name.includes("cemento") ||
    name.includes("antracita") ||
    coleccion === "industrial"
  ) {
    return input.color === "oscuro" ? "gris-oscuro" : "gris-claro";
  }

  if (input.tipo === "roble") {
    if (input.color === "claro") return "roble-claro";
    if (input.color === "medio") return "roble-medio";
    return "roble-oscuro";
  }

  if (input.temaColeccion === "nordico") {
    return input.color === "oscuro" ? "gris-oscuro" : "blanco-nordico";
  }

  if (input.temaColeccion === "industrial") {
    return input.color === "oscuro" ? "hormigon-oscuro" : "hormigon-claro";
  }

  if (input.color === "claro") return "roble-claro";
  if (input.color === "medio") return "roble-medio";
  return "roble-oscuro";
}

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
      repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px),
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

function installedOverlay(style: CSSProperties, config: PatternConfig): CSSProperties {
  let wide = style;
  if (config.kind === "wood" || config.kind === "grey") {
    wide = config.kind === "grey"
      ? greyPlankStyle(config.base, config.mid, "rgba(255,255,255,0.1)", 90)
      : woodPlankStyle(config.base, config.mid, config.dark, 90);
  }
  return {
    ...wide,
    backgroundImage: `
      linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 12%, rgba(0,0,0,0.07) 100%),
      ${typeof wide.backgroundImage === "string" ? wide.backgroundImage : ""}
    `.trim(),
  };
}

function detailZoom(style: CSSProperties, config: PatternConfig): CSSProperties {
  if (config.kind === "herringbone") {
    return {
      ...style,
      backgroundSize: "40px 40px",
      filter: "contrast(1.1) saturate(1.05)",
    };
  }
  if (config.kind === "stone" || config.kind === "concrete") {
    return { ...style, filter: "contrast(1.12) brightness(1.02)" };
  }
  const zoomed =
    config.kind === "grey"
      ? greyPlankStyle(config.base, config.mid, "rgba(255,255,255,0.08)", 52)
      : woodPlankStyle(config.base, config.mid, config.dark, 52, 1);
  return { ...zoomed, filter: "contrast(1.08) saturate(1.06)" };
}

export function getPatternStyle(
  category: VinylFloorCategory,
  role: FloorGalleryRole,
): CSSProperties {
  const config = PATTERN_CONFIG[category] ?? PATTERN_CONFIG["roble-claro"];
  const base = baseStyleForConfig(config);

  switch (role) {
    case "installed":
      return installedOverlay(base, config);
    case "texture":
      return base;
    case "detail":
      return detailZoom(base, config);
    default:
      return base;
  }
}

export function getPatternLabel(category: VinylFloorCategory): string {
  return PATTERN_CONFIG[category]?.description ?? "Textura vinílica";
}

export function getRoleLabel(role: FloorGalleryRole): string {
  const labels: Record<FloorGalleryRole, string> = {
    installed: "Suelo instalado",
    texture: "Textura del suelo",
    detail: "Detalle de lama",
  };
  return labels[role];
}
