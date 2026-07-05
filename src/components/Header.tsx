import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        <a href="#" className="text-sm font-bold tracking-tight text-white sm:text-base">
          VinylPro <span className="text-accent-light">Canarias</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 sm:flex">
          <a href="#catalogo" className="transition hover:text-white">
            Catálogo
          </a>
          <a href="#contacto" className="transition hover:text-white">
            Contacto
          </a>
        </nav>

        <WhatsAppButton
          variant="secondary"
          label="WhatsApp"
          className="!px-4 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm"
        />
      </div>
    </header>
  );
}
