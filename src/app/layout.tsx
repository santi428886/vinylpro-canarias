import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/shared/WhatsAppButton";
import { CatalogExperienceProvider } from "@/context/CatalogExperienceContext";
import JsonLd from "@/components/seo/JsonLd";
import {
  createMetadata,
  DEFAULT_DESCRIPTION,
  localBusinessJsonLd,
  SITE_NAME,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: `${SITE_NAME} | Suelos vinílicos PVC premium en Gran Canaria`,
  description: DEFAULT_DESCRIPTION,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <CatalogExperienceProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CatalogExperienceProvider>
      </body>
    </html>
  );
}
