type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  dark?: boolean;
};

export default function PageHero({
  label,
  title,
  description,
  dark = false,
}: PageHeroProps) {
  return (
    <section
      className={`pt-28 pb-16 sm:pt-36 sm:pb-20 ${
        dark ? "bg-foreground text-white" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {label && (
          <p
            className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
              dark ? "text-accent-light" : "text-accent"
            }`}
          >
            {label}
          </p>
        )}
        <h1
          className={`max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed ${
              dark ? "text-white/60" : "text-muted"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
