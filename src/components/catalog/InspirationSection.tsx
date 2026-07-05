"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { inspirationRooms } from "@/data/catalog-experience";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function InspirationSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="Inspiración"
            title="Encuentra tu estilo"
            description="Descubre cómo nuestros suelos vinílicos transforman cada espacio."
          />
        </FadeIn>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inspirationRooms.map((room, i) => (
            <FadeIn key={room.id} delay={i * 0.08}>
              <Link
                href={`/modelo/${room.productSlug}`}
                className={`group relative block overflow-hidden rounded-3xl ${
                  i === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[640px]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={room.image}
                  alt={room.label}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "66vw" : "33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <motion.span
                  className="absolute bottom-6 left-6 text-2xl font-semibold text-white sm:text-3xl"
                  initial={false}
                  whileHover={{ x: 4 }}
                >
                  {room.label}
                </motion.span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
