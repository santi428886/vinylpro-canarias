import Image from "next/image";
import { realClientInstallations } from "@/data/catalog-experience";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function RealClientsGallery() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Clientes reales"
            title="Instalaciones en Gran Canaria"
            description="Proyectos completados con materiales premium e instalación profesional."
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {realClientInstallations.map((client, i) => (
            <FadeIn key={client.id} delay={i * 0.07}>
              <article className="group overflow-hidden rounded-3xl bg-surface transition hover:shadow-xl hover:shadow-black/[0.06]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={client.image}
                    alt={`Instalación de ${client.model}`}
                    fill
                    loading="lazy"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-semibold text-foreground">
                    {client.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{client.location}</p>
                  <p className="mt-3 text-sm font-medium text-accent">
                    {client.model}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
