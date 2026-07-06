import Image from "next/image";
import Link from "next/link";
import {
  AMBIENT_SCENES,
  AMBIENT_SCENE_LABELS,
  ambientImagePath,
} from "@/data/ambient-images";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

export default function HomeGalleryPreview() {
  const preview = AMBIENT_SCENES.slice(0, 4);

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Galería"
            title="Proyectos reales en Gran Canaria"
            description="Salones, cocinas, dormitorios y locales transformados con suelo vinílico premium."
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {preview.map((scene, i) => (
            <FadeIn key={scene} delay={i * 0.08}>
              <Link
                href="/galeria"
                className={`group relative block overflow-hidden rounded-2xl ${
                  i === 0
                    ? "col-span-2 row-span-2 aspect-square lg:aspect-auto lg:min-h-[480px]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={ambientImagePath(scene)}
                  alt={AMBIENT_SCENE_LABELS[scene]}
                  fill
                  loading="lazy"
                  className="object-cover object-[center_75%] transition duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "50vw" : "25vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {AMBIENT_SCENE_LABELS[scene]}
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Button href="/galeria" variant="outline" size="lg">
            Ver galería completa
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
