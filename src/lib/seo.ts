import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vinylpro-canarias.es";

export const SITE_NAME = "VinylPro Canarias";

export const DEFAULT_DESCRIPTION =
  "Instalación profesional de suelos vinílicos PVC en Gran Canaria. Materiales premium, presupuesto gratuito y más de 100 modelos disponibles.";

export const siteMetadataBase = new URL(SITE_URL);

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: siteMetadataBase,
    title,
    description,
    keywords: [
      "suelo vinílico Gran Canaria",
      "PVC click Las Palmas",
      "instalación suelos vinílicos",
      "VinylPro Canarias",
      "suelo vinílico instalado",
    ],
    openGraph: {
      type: "website",
      locale: "es_ES",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    telephone: "+34-600-000-000",
    areaServed: {
      "@type": "Place",
      name: "Gran Canaria, Islas Canarias, España",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Palmas de Gran Canaria",
      addressRegion: "Canarias",
      addressCountry: "ES",
    },
    priceRange: "€€",
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: [],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de suelos vinílicos PVC",
      itemListElement: {
        "@type": "OfferCatalog",
        name: "Suelos vinílicos con instalación",
      },
    },
  };
}

import { textureTokenToOgImage } from "@/data/floor-images";

export function productJsonLd(product: {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nombre,
    description: product.descripcion,
    image: textureTokenToOgImage(product.imagen),
    url: `${SITE_URL}/modelo/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.precio,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.precio,
        priceCurrency: "EUR",
        unitText: "m² instalado",
      },
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };
}
