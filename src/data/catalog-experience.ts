import { ambientImagePath } from "@/data/ambient-images";

export const inspirationRooms = [
  {
    id: "salones",
    label: "Salones",
    image: ambientImagePath("gris-claro-premium"),
    productSlug: "roble-gris-nordico-plata",
  },
  {
    id: "dormitorios",
    label: "Dormitorios",
    image: ambientImagePath("gris-nordico"),
    productSlug: "roble-gris-nordico-plata",
  },
  {
    id: "roble-natural",
    label: "Roble Natural",
    image: ambientImagePath("roble-natural"),
    productSlug: "roble-natural-claro",
  },
  {
    id: "roble-miel",
    label: "Roble Miel",
    image: ambientImagePath("roble-miel"),
    productSlug: "roble-natural-arena",
  },
  {
    id: "beige",
    label: "Beige Arena",
    image: ambientImagePath("beige-arena"),
    productSlug: "piedra-caliza-marfil",
  },
  {
    id: "roble-oscuro",
    label: "Roble Oscuro",
    image: ambientImagePath("roble-oscuro"),
    productSlug: "roble-natural-noche",
  },
];

export const beforeAfterItems = [
  {
    id: "ba1",
    title: "Salón en Las Palmas",
    before: ambientImagePath("beige-arena"),
    after: ambientImagePath("gris-claro-premium"),
  },
  {
    id: "ba2",
    title: "Pasillo en Telde",
    before: ambientImagePath("roble-natural"),
    after: ambientImagePath("roble-miel"),
  },
  {
    id: "ba3",
    title: "Dormitorio en Vecindario",
    before: ambientImagePath("gris-nordico"),
    after: ambientImagePath("roble-oscuro"),
  },
];

export const realClientInstallations = [
  {
    id: "c1",
    name: "María G.",
    location: "Las Palmas",
    model: "Roble Natural Claro",
    image: ambientImagePath("roble-natural"),
  },
  {
    id: "c2",
    name: "Carlos R.",
    location: "Telde",
    model: "Roble Miel Arena",
    image: ambientImagePath("roble-miel"),
  },
  {
    id: "c3",
    name: "Ana L.",
    location: "Maspalomas",
    model: "Gris Nórdico Plata",
    image: ambientImagePath("gris-nordico"),
  },
  {
    id: "c4",
    name: "Local Nova",
    location: "Vecindario",
    model: "Gris Claro Premium",
    image: ambientImagePath("gris-claro-premium"),
  },
  {
    id: "c5",
    name: "Pedro M.",
    location: "Valsequillo",
    model: "Beige Arena",
    image: ambientImagePath("beige-arena"),
  },
  {
    id: "c6",
    name: "Laura S.",
    location: "Las Palmas",
    model: "Roble Oscuro",
    image: ambientImagePath("roble-oscuro"),
  },
];
