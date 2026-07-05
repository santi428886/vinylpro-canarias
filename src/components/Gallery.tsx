import Image from "next/image";
import { galleryItems } from "@/data/catalog";
import SectionHeader from "./SectionHeader";

export default function Gallery() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Galería"
          title="Antes y después"
          description="Inspiración real para salones, cocinas, dormitorios y locales comerciales."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto lg:min-h-[420px]" : "aspect-square"
              }`}
            >
              <Image
                src={item.image}
                alt={`${item.label} con suelo vinílico`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 640px) 50vw, 33vw"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
