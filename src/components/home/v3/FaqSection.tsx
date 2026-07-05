"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Droplets,
  Sparkles,
  Layers,
  Timer,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { faqItems } from "@/data/home-v3";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  droplets: Droplets,
  sparkles: Sparkles,
  layers: Layers,
  timer: Timer,
  "help-circle": HelpCircle,
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeader
            label="FAQ"
            title="Preguntas frecuentes"
            description="Resolvemos las dudas más habituales sobre suelos vinílicos PVC."
          />
        </FadeIn>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4">
          {faqItems.map((item, i) => {
            const Icon = iconMap[item.icon] ?? HelpCircle;
            const isOpen = openIndex === i;

            return (
              <FadeIn key={item.question} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-accent/30 bg-white shadow-lg shadow-black/[0.04]"
                      : "border-border bg-white hover:border-accent/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start gap-4 p-6 text-left sm:p-8"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isOpen
                          ? "bg-accent text-white"
                          : "bg-surface text-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="pr-8 text-base font-semibold text-foreground sm:text-lg">
                        {item.question}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-3 overflow-hidden text-sm leading-relaxed text-muted sm:text-base"
                          >
                            {item.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="mt-1 shrink-0 text-muted">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
