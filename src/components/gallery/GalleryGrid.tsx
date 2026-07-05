"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems } from "@/data/site-content";
import type { GalleryCategory } from "@/data/site-content";
import FadeIn from "@/components/ui/FadeIn";

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");

  const filtered =
    active === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active === cat.id
                ? "bg-foreground text-white"
                : "bg-surface text-muted hover:bg-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.05}>
            <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-5 opacity-0 transition group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{item.title}</p>
                {item.location && (
                  <p className="text-xs text-white/70">{item.location}</p>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
