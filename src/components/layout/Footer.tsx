import Link from "next/link";
import { navLinks } from "@/data/site-content";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold tracking-tight">
              VinylPro Canarias
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Instalación de suelos vinílicos PVC en Gran Canaria. Materiales
              premium con instalación profesional incluida.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Navegación
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Zona de servicio
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Las Palmas, Telde, Valsequillo, Vecindario, Maspalomas y toda
              Gran Canaria.
            </p>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-accent-light transition hover:text-white"
            >
              WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} VinylPro Canarias. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-white/35">
            Preparado para CMS · Stripe · Catálogo ilimitado
          </p>
        </div>
      </div>
    </footer>
  );
}
