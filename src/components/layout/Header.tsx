"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/site-content";
import Button from "@/components/ui/Button";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isDark = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isDark
            ? "border-transparent bg-transparent"
            : "border-b border-border/60 bg-white/90 backdrop-blur-xl shadow-sm shadow-black/[0.03]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className={`text-base font-semibold tracking-tight transition-colors sm:text-lg ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            VinylPro
            <span className={isDark ? "text-accent-light" : "text-accent"}>
              {" "}
              Canarias
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? isDark
                      ? "text-white"
                      : "text-accent"
                    : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href="/catalogo"
              variant={isDark ? "outline" : "ghost"}
              size="sm"
              className={
                isDark
                  ? "!border-white/30 !text-white hover:!bg-white hover:!text-foreground"
                  : ""
              }
            >
              Ver catálogo
            </Button>
            <Button
              href={isHome ? "#calculadora" : "/#calculadora"}
              variant="whatsapp"
              size="sm"
            >
              Presupuesto
            </Button>
          </div>

          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-4 text-lg font-medium text-foreground hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/catalogo" variant="outline" className="w-full">
                  Ver catálogo
                </Button>
                <Button
                  href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  variant="whatsapp"
                  className="w-full"
                  external
                >
                  Solicitar presupuesto
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
