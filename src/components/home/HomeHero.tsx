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
          src={ambientImagePath("roble-natural")}
          alt="Salón moderno con suelo vinílico premium instalado"
          fill
          priority
          className="object-cover object-[center_88%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
              Gran Canaria · Instalación premium
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <span className="font-medium tracking-tight">
                <span className="text-amber-400" aria-hidden>
                  ★★★★★
                </span>{" "}
                5.0
              </span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
              <span className="text-white/80">
                +300 instalaciones en Gran Canaria
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl">
            Renueva cualquier espacio con suelo vinílico premium.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)] sm:text-xl">
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
            { value: "15", label: "Modelos" },
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
