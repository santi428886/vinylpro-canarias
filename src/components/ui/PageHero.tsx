type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  dark?: boolean;
  image?: string;
  imageAlt?: string;
};

export default function PageHero({
  label,
  title,
  description,
  dark = false,
  image,
  imageAlt = "",
}: PageHeroProps) {
  if (image) {
    return (
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={imageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
        <div className="relative mx-auto max-w-7xl px-5 text-white sm:px-8 lg:px-12">
          {label && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              {label}
            </p>
          )}
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

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
