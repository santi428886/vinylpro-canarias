export type FloorProduct = {
  id: string;
  name: string;
  description: string;
  type: "PVC click" | "Vinílico";
  price: number;
  patternCategory:
    | "roble-claro"
    | "roble-medio"
    | "roble-oscuro"
    | "gris-claro"
    | "espiga-clara";
};

export const floorCatalog: FloorProduct[] = [
  {
    id: "roble-natural",
    name: "Roble Natural PVC Click",
    description:
      "Tonos cálidos de madera natural. Ideal para salones y dormitorios con acabado cálido y acogedor.",
    type: "PVC click",
    price: 24.9,
    patternCategory: "roble-claro",
  },
  {
    id: "roble-gris",
    name: "Roble Gris Moderno",
    description:
      "Estilo nórdico y contemporáneo. Perfecto para espacios minimalistas y pisos de alquiler.",
    type: "PVC click",
    price: 25.9,
    patternCategory: "gris-claro",
  },
  {
    id: "madera-oscura",
    name: "Madera Oscura Premium",
    description:
      "Acabado elegante y sofisticado. Resistente al desgaste diario en zonas de alto tránsito.",
    type: "Vinílico",
    price: 29.9,
    patternCategory: "roble-oscuro",
  },
  {
    id: "cemento-gris",
    name: "Cemento Gris Vinílico",
    description:
      "Efecto cemento pulido industrial. Muy demandado en cocinas, locales y espacios modernos.",
    type: "Vinílico",
    price: 27.9,
    patternCategory: "gris-claro",
  },
  {
    id: "espiga-premium",
    name: "Espiga Vinílica Premium",
    description:
      "Patrón espiga clásico con instalación profesional. El más elegante de nuestro catálogo.",
    type: "Vinílico",
    price: 34.9,
    patternCategory: "espiga-clara",
  },
];

export const includedItems = [
  "Material PVC/vinílico",
  "Instalación profesional",
  "Corte y ajuste",
  "Asesoramiento por WhatsApp",
  "Presupuesto rápido con fotos",
];

export const advantages = [
  {
    title: "Sin obra pesada",
    description: "Instalación limpia, sin polvo ni demolición complicada.",
    icon: "🏗️",
  },
  {
    title: "Instalación rápida",
    description: "Renueva tu suelo en pocos días, sin largas esperas.",
    icon: "⚡",
  },
  {
    title: "Ideal para viviendas, alquileres y locales",
    description: "Solución versátil para cualquier tipo de espacio.",
    icon: "🏠",
  },
  {
    title: "Resistente y fácil de limpiar",
    description: "Perfecto para familias, mascotas y uso intensivo.",
    icon: "✨",
  },
  {
    title: "Acabado moderno",
    description: "Diseños actuales que elevan cualquier estancia.",
    icon: "🎨",
  },
  {
    title: "Presupuesto por WhatsApp",
    description: "Respuesta rápida con fotos y metros aproximados.",
    icon: "💬",
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Envías fotos y metros aproximados",
    description: "Mándanos fotos del espacio y cuántos m² necesitas.",
  },
  {
    step: 2,
    title: "Te recomendamos modelos y precio",
    description: "Te asesoramos con el suelo ideal y presupuesto cerrado.",
  },
  {
    step: 3,
    title: "Coordinamos visita o instalación",
    description: "Agendamos la visita técnica o directamente la instalación.",
  },
  {
    step: 4,
    title: "Estrenas suelo nuevo",
    description: "Disfruta de tu espacio renovado con acabado profesional.",
  },
];

export const galleryItems = [
  {
    id: "salon",
    label: "Salón",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
  {
    id: "cocina",
    label: "Cocina",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
  },
  {
    id: "dormitorio",
    label: "Dormitorio",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  },
  {
    id: "local",
    label: "Local comercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "antes-despues-1",
    label: "Antes / Después",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  },
  {
    id: "antes-despues-2",
    label: "Antes / Después",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
  },
];
