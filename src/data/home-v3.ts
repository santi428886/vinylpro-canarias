import type { FloorSystem } from "@/types/product";

export const floorSystems: Array<{
  id: FloorSystem;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  idealFor: string[];
  advantages: string[];
  cta: string;
  href: string;
}> = [
  {
    id: "spc-click",
    title: "PVC SPC Click",
    subtitle: "El más versátil y resistente",
    description:
      "Núcleo rígido SPC con sistema click sin pegamento. La opción más completa para viviendas y locales con alto tránsito.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    idealFor: [
      "Viviendas",
      "Cocinas",
      "Baños",
      "Locales",
      "Mucho tránsito",
    ],
    advantages: [
      "Muy resistente",
      "100% resistente al agua",
      "Instalación rápida",
      "Muy duradero",
    ],
    cta: "Ver modelos SPC",
    href: "/catalogo?sistema=spc-click",
  },
  {
    id: "adhesivo",
    title: "PVC Adhesivo",
    subtitle: "Reforma rápida y acabado natural",
    description:
      "Lamas finas que se pegan directamente sobre el pavimento existente. Perfecto para renovaciones sin levantar el suelo.",
    image:
      "https://images.unsplash.com/photo-1615874959472-d609969a20ed?w=1200&q=80",
    idealFor: ["Reformas rápidas", "Cocinas", "Baños", "Viviendas"],
    advantages: [
      "Muy fino",
      "Económico",
      "Aspecto muy natural",
      "Fácil limpieza",
    ],
    cta: "Ver modelos adhesivos",
    href: "/catalogo?sistema=adhesivo",
  },
  {
    id: "rollo",
    title: "PVC en Rollo",
    subtitle: "Continuidad para grandes espacios",
    description:
      "Instalación continua sin juntas visibles. Solución eficiente para oficinas, habitaciones y superficies amplias.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    idealFor: ["Grandes superficies", "Oficinas", "Habitaciones"],
    advantages: ["Continuidad visual", "Económico", "Muy cómodo"],
    cta: "Ver modelos en rollo",
    href: "/catalogo?sistema=rollo",
  },
];

export type ComparisonLevel = "excelente" | "muy-bueno" | "bueno" | "medio";

export const comparisonFeatures: Array<{
  key: string;
  label: string;
  icon: string;
  values: Record<FloorSystem, { level: ComparisonLevel; text: string }>;
}> = [
  {
    key: "resistencia",
    label: "Resistencia",
    icon: "shield",
    values: {
      "spc-click": { level: "excelente", text: "Máxima" },
      adhesivo: { level: "bueno", text: "Media-alta" },
      rollo: { level: "medio", text: "Media" },
    },
  },
  {
    key: "agua",
    label: "Agua",
    icon: "droplets",
    values: {
      "spc-click": { level: "excelente", text: "100% impermeable" },
      adhesivo: { level: "muy-bueno", text: "Resistente" },
      rollo: { level: "muy-bueno", text: "Resistente" },
    },
  },
  {
    key: "durabilidad",
    label: "Durabilidad",
    icon: "clock",
    values: {
      "spc-click": { level: "excelente", text: "15-20 años" },
      adhesivo: { level: "muy-bueno", text: "10-15 años" },
      rollo: { level: "bueno", text: "8-12 años" },
    },
  },
  {
    key: "confort",
    label: "Confort",
    icon: "heart",
    values: {
      "spc-click": { level: "muy-bueno", text: "Agradable" },
      adhesivo: { level: "bueno", text: "Correcto" },
      rollo: { level: "excelente", text: "Muy suave" },
    },
  },
  {
    key: "instalacion",
    label: "Instalación",
    icon: "wrench",
    values: {
      "spc-click": { level: "excelente", text: "Click, sin pegamento" },
      adhesivo: { level: "muy-bueno", text: "Pegado directo" },
      rollo: { level: "bueno", text: "Continua en rollo" },
    },
  },
  {
    key: "precio",
    label: "Precio",
    icon: "euro",
    values: {
      "spc-click": { level: "medio", text: "Medio-alto" },
      adhesivo: { level: "excelente", text: "Económico" },
      rollo: { level: "excelente", text: "Muy económico" },
    },
  },
  {
    key: "uso",
    label: "Uso recomendado",
    icon: "home",
    values: {
      "spc-click": { level: "excelente", text: "Vivienda y local" },
      adhesivo: { level: "muy-bueno", text: "Reformas" },
      rollo: { level: "bueno", text: "Grandes superficies" },
    },
  },
];

export const workTimeline = [
  {
    step: 1,
    title: "Nos envías fotos",
    description: "Comparte imágenes del espacio y metros aproximados.",
    icon: "camera",
  },
  {
    step: 2,
    title: "Te asesoramos",
    description: "Te recomendamos el tipo de suelo ideal para tu caso.",
    icon: "message",
  },
  {
    step: 3,
    title: "Calculamos presupuesto",
    description: "Presupuesto cerrado con material e instalación.",
    icon: "calculator",
  },
  {
    step: 4,
    title: "Elegimos el modelo",
    description: "Seleccionas color, acabado y diseño de nuestro catálogo.",
    icon: "palette",
  },
  {
    step: 5,
    title: "Instalación profesional",
    description: "Nuestros instaladores especializados ejecutan el trabajo.",
    icon: "hammer",
  },
  {
    step: 6,
    title: "Disfrutas tu nuevo suelo",
    description: "Entrega limpia con garantía y consejos de mantenimiento.",
    icon: "sparkles",
  },
];

export const installationIncludes = [
  {
    title: "Material",
    description: "Suelo vinílico PVC de calidad certificada, incluido en el precio por m².",
    icon: "package",
    optional: false,
  },
  {
    title: "Instalación",
    description: "Colocación profesional por instaladores especializados en suelos vinílicos.",
    icon: "wrench",
    optional: false,
  },
  {
    title: "Cortes",
    description: "Corte y ajuste preciso en perimetros, puertas y zonas complejas.",
    icon: "scissors",
    optional: false,
  },
  {
    title: "Remates",
    description: "Acabado en juntas, transiciones y encuentros con paredes.",
    icon: "ruler",
    optional: false,
  },
  {
    title: "Limpieza",
    description: "Recogida de restos y entrega del espacio listo para usar.",
    icon: "sparkles",
    optional: false,
  },
  {
    title: "Garantía",
    description: "Garantía del fabricante y de instalación incluida en cada proyecto.",
    icon: "shield-check",
    optional: false,
  },
  {
    title: "Rodapiés",
    description: "Suministro e instalación de rodapiés a juego con el suelo.",
    icon: "layers",
    optional: true,
  },
  {
    title: "Retirada de suelo",
    description: "Desmontaje y retirada del pavimento anterior si es necesario.",
    icon: "trash",
    optional: true,
  },
];

export const whyVinylPro = [
  {
    title: "Más de 100 modelos",
    description: "Catálogo amplio con diseños para cada estilo y presupuesto.",
    icon: "grid",
  },
  {
    title: "Presupuesto en 24 horas",
    description: "Respuesta rápida por WhatsApp con fotos y metros.",
    icon: "clock",
  },
  {
    title: "Garantía",
    description: "15-20 años de garantía del fabricante más garantía de instalación.",
    icon: "shield-check",
  },
  {
    title: "Atención personalizada",
    description: "Asesoramiento directo para elegir el suelo perfecto.",
    icon: "user-check",
  },
  {
    title: "Materiales premium",
    description: "Suelos certificados con acabados de calidad europea.",
    icon: "award",
  },
  {
    title: "Instaladores especializados",
    description: "Equipo experto únicamente en suelos vinílicos PVC.",
    icon: "hard-hat",
  },
];

export const faqItems = [
  {
    question: "¿Qué suelo dura más?",
    answer:
      "El PVC SPC Click es el más duradero, con garantías de 15 a 20 años. Su núcleo rígido soporta el tránsito intenso en viviendas y locales comerciales.",
    icon: "clock",
  },
  {
    question: "¿Sirve para baños?",
    answer:
      "Sí. Todos nuestros suelos vinílicos son 100% resistentes al agua. Recomendamos SPC Click o adhesivo en baños y cocinas por su impermeabilidad total.",
    icon: "droplets",
  },
  {
    question: "¿Necesita mantenimiento?",
    answer:
      "Mínimo. Solo requiere barrido y fregado con productos neutros. No encerar, no tratar. Mucho más fácil que parquet o cerámica.",
    icon: "sparkles",
  },
  {
    question: "¿Se puede instalar sobre baldosas?",
    answer:
      "Sí, siempre que el pavimento esté estable, nivelado y limpio. El PVC adhesivo y SPC Click son ideales para renovar sin levantar baldosas.",
    icon: "layers",
  },
  {
    question: "¿Cuánto tarda una instalación?",
    answer:
      "Un piso medio de 60-80 m² se instala en 1-2 días. Sin obras, sin polvo y sin esperas largas. Coordinamos fecha según tu disponibilidad.",
    icon: "timer",
  },
  {
    question: "¿Hace falta levantar el suelo antiguo?",
    answer:
      "No siempre. En muchos casos instalamos directamente sobre el suelo existente. Si hay desniveles o humedad, te lo indicamos en la visita técnica.",
    icon: "help-circle",
  },
];

export const levelColors: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  excelente: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "muy-bueno": {
    bg: "bg-teal-50",
    text: "text-teal-700",
    dot: "bg-teal-500",
  },
  bueno: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-500",
  },
  medio: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
};

export const systemLabels: Record<FloorSystem, string> = {
  "spc-click": "SPC Click",
  adhesivo: "Adhesivo",
  rollo: "En rollo",
};
