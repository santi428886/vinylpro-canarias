"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ambientImagePath } from "@/data/ambient-images";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <Image
          src={ambientImagePath("gris-claro-premium")}
          alt="Salón moderno con suelo vinílico premium"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
            Gran Canaria · Instalación premium
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Renueva cualquier espacio con suelo vinílico premium.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Instalación profesional en Gran Canaria con materiales de primera
            calidad y presupuesto gratuito.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/catalogo" variant="secondary" size="lg">
              Ver catálogo
            </Button>
            <Button
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              variant="outline"
              size="lg"
              external
              className="!border-white/30 !text-white hover:!bg-white hover:!text-foreground"
            >
              Solicitar presupuesto
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 hidden gap-12 border-t border-white/10 pt-8 sm:flex"
        >
          {[
            { value: "100+", label: "Modelos" },
            { value: "24h", label: "Presupuesto" },
            { value: "15-20", label: "Años garantía" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
