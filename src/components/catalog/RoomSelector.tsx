"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ambientImagePath } from "@/data/ambient-images";
import { ROOM_OPTIONS, type RoomId } from "@/data/catalog-visual";
import type { ProductFilters } from "@/types/product";

const ROOM_AMBIENT: Record<RoomId, string> = {
  salon: ambientImagePath("gris-claro-premium"),
  cocina: ambientImagePath("beige-arena"),
  dormitorio: ambientImagePath("gris-nordico"),
  bano: ambientImagePath("gris-claro-premium"),
};

type RoomSelectorProps = {
  activeRoom: RoomId | null;
  onSelect: (filters: Partial<ProductFilters>, room: RoomId | null) => void;
};

export default function RoomSelector({ activeRoom, onSelect }: RoomSelectorProps) {
  return (
    <section aria-labelledby="room-selector-heading">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="room-selector-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Por estancia
        </h2>
        {activeRoom && (
          <button
            type="button"
            onClick={() => onSelect({ uso: undefined, room: null }, null)}
            className="text-xs font-medium text-muted transition hover:text-foreground"
          >
            Ver todas
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {ROOM_OPTIONS.map((room, i) => {
          const active = activeRoom === room.id;
          const src = ROOM_AMBIENT[room.id];
          return (
            <motion.button
              key={room.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              onClick={() => {
                if (active) {
                  onSelect({ uso: undefined, room: null }, null);
                } else {
                  onSelect({ uso: [room.uso], room: room.id }, room.id);
                }
              }}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-500 ${
                active
                  ? "ring-2 ring-foreground ring-offset-2"
                  : "ring-1 ring-border/80 hover:ring-foreground/20"
              }`}
            >
              <div className="relative aspect-[4/5] min-h-[180px] sm:min-h-[220px]">
                <Image
                  src={src}
                  alt={`Suelo vinílico para ${room.label}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
                    {room.subtitle}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white sm:text-lg">
                    {room.label}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
