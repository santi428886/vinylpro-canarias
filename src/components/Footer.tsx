export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground py-10 text-white">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8 lg:px-12">
        <p className="text-lg font-bold">VinylPro Canarias</p>
        <p className="mt-2 text-sm text-white/65">
          Instalación de suelos vinílicos PVC en Gran Canaria
        </p>
        <p className="mt-1 text-sm text-white/50">
          Las Palmas, Telde, Valsequillo, Vecindario y toda Gran Canaria
        </p>
        <p className="mt-6 text-xs text-white/35">
          © {new Date().getFullYear()} VinylPro Canarias. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
