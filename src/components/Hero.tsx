import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-surface">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Salón moderno con suelo vinílico"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-light backdrop-blur-sm">
            Gran Canaria
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            VinylPro Canarias
          </h1>

          <p className="mt-4 text-lg font-medium text-white/90 sm:text-xl">
            Instalación de suelos vinílicos PVC en Gran Canaria, con material e
            instalación incluidos por m².
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Renueva tu vivienda, local o piso de alquiler sin obras
            complicadas, sin polvo y con un acabado moderno.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg transition hover:bg-gray-100"
            >
              Ver catálogo
            </a>
            <WhatsAppButton variant="secondary" />
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
              Desde 24,90 €/m² instalado
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
              Presupuesto en 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
              Toda Gran Canaria
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
