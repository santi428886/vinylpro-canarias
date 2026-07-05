"use client";

import Image from "next/image";
import { roomImagePath } from "@/data/floor-gallery";
import { ROOM_OPTIONS, type RoomId } from "@/data/catalog-visual";
import type { ProductFilters } from "@/types/product";

const ROOM_IMAGE_ID: Record<RoomId, string> = {
  salon: "salon",
  cocina: "cocina",
  dormitorio: "dormitorio",
  bano: "bano",
};

type RoomSelectorProps = {
  activeRoom: RoomId | null;
  onSelect: (filters: Partial<ProductFilters>, room: RoomId | null) => void;
};

export default function RoomSelector({ activeRoom, onSelect }: RoomSelectorProps) {
  return (
    <section aria-labelledby="room-selector-heading">
      <h2
        id="room-selector-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Elige tu suelo por <span className="text-accent">estancia</span>
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROOM_OPTIONS.map((room) => {
          const active = activeRoom === room.id;
          const src = roomImagePath(ROOM_IMAGE_ID[room.id]);
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => {
                if (active) {
                  onSelect({ uso: undefined, room: null }, null);
                } else {
                  onSelect({ uso: [room.uso], room: room.id }, room.id);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                active
                  ? "ring-2 ring-accent ring-offset-2 shadow-lg"
                  : "ring-1 ring-border hover:shadow-md"
              }`}
            >
              <div className="relative aspect-[3/4] min-h-[220px] sm:min-h-[280px]">
                <Image
                  src={src}
                  alt={`Suelo vinílico para ${room.label}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    {room.subtitle}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                    {room.label}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
