import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VinylPro Canarias | Suelos vinílicos PVC en Gran Canaria",
  description:
    "Instalación de suelos vinílicos PVC en Gran Canaria. Material e instalación incluidos desde 24,90 €/m². Presupuesto gratis por WhatsApp.",
  keywords: [
    "suelo vinílico Gran Canaria",
    "PVC click Las Palmas",
    "instalación suelos vinílicos",
    "VinylPro Canarias",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
