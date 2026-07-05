export const benefits = [
  { icon: "water", title: "100% resistente al agua" },
  { icon: "speed", title: "Instalación rápida" },
  { icon: "clean", title: "Sin obras" },
  { icon: "sparkle", title: "Fácil limpieza" },
  { icon: "shield", title: "Garantía" },
  { icon: "star", title: "Acabado profesional" },
] as const;

export const services = [
  {
    id: "instalacion",
    title: "Instalación",
    description:
      "Colocación profesional de suelos vinílicos PVC con acabado impecable. Sistema click o pegado según el proyecto.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    id: "nivelacion",
    title: "Nivelación",
    description:
      "Preparación y nivelación del pavimento existente para garantizar un resultado perfecto y duradero.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    id: "rodapies",
    title: "Rodapiés",
    description:
      "Suministro e instalación de rodapiés a juego con el suelo elegido. Acabado integrado y profesional.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "retirada",
    title: "Retirada de suelo",
    description:
      "Desmontaje y retirada del suelo anterior. Gestión limpia del material retirado.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "asesoramiento",
    title: "Asesoramiento",
    description:
      "Consultoría personalizada por WhatsApp. Te ayudamos a elegir el modelo ideal para tu espacio y presupuesto.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
  },
];

export const aboutContent = {
  historia: {
    title: "Nuestra historia",
    text: "VinylPro Canarias nació con una misión clara: democratizar el acceso a suelos vinílicos de calidad europea en Gran Canaria. Desde nuestros inicios, hemos transformado cientos de viviendas, locales y pisos turísticos con soluciones rápidas, limpias y de acabado premium.",
  },
  proceso: {
    title: "Nuestro proceso",
    steps: [
      "Consulta gratuita por WhatsApp con fotos y medidas",
      "Recomendación personalizada de modelos y presupuesto",
      "Visita técnica si es necesaria",
      "Instalación profesional en el plazo acordado",
      "Entrega con garantía y consejos de mantenimiento",
    ],
  },
  compromiso: {
    title: "Compromiso",
    text: "Trabajamos exclusivamente con materiales certificados, cumplimos plazos y mantenemos una comunicación transparente en cada fase del proyecto. Tu satisfacción es nuestra mejor referencia.",
  },
  garantia: {
    title: "Garantía",
    text: "Todos nuestros suelos incluyen garantía del fabricante de 15 a 20 años según colección, más garantía de instalación. Respaldamos cada proyecto con servicio postventa directo.",
  },
};

export type GalleryCategory =
  | "antes-despues"
  | "instalaciones"
  | "dormitorios"
  | "salones"
  | "locales"
  | "cocinas";

export const galleryItems: Array<{
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  location?: string;
}> = [
  {
    id: "g1",
    title: "Salón renovado",
    category: "salones",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
  },
  {
    id: "g2",
    title: "Antes y después",
    category: "antes-despues",
    location: "Telde",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
  },
  {
    id: "g3",
    title: "Cocina moderna",
    category: "cocinas",
    location: "Vecindario",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
  },
  {
    id: "g4",
    title: "Dormitorio premium",
    category: "dormitorios",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
  },
  {
    id: "g5",
    title: "Local comercial",
    category: "locales",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  {
    id: "g6",
    title: "Instalación en curso",
    category: "instalaciones",
    location: "Valsequillo",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
  },
  {
    id: "g7",
    title: "Transformación completa",
    category: "antes-despues",
    location: "Telde",
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
  },
  {
    id: "g8",
    title: "Salón luminoso",
    category: "salones",
    location: "Maspalomas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    id: "g9",
    title: "Cocina abierta",
    category: "cocinas",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  },
  {
    id: "g10",
    title: "Espiga premium",
    category: "instalaciones",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
  },
  {
    id: "g11",
    title: "Dormitorio infantil",
    category: "dormitorios",
    location: "Telde",
    image:
      "https://images.unsplash.com/photo-1615874959472-d609969a20ed?w=1200&q=80",
  },
  {
    id: "g12",
    title: "Oficina moderna",
    category: "locales",
    location: "Las Palmas",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  },
];

export const galleryCategories: Array<{
  id: GalleryCategory | "all";
  label: string;
}> = [
  { id: "all", label: "Todos" },
  { id: "antes-despues", label: "Antes y después" },
  { id: "instalaciones", label: "Instalaciones" },
  { id: "dormitorios", label: "Dormitorios" },
  { id: "salones", label: "Salones" },
  { id: "locales", label: "Locales" },
  { id: "cocinas", label: "Cocinas" },
];

export const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/galeria", label: "Galería" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];
