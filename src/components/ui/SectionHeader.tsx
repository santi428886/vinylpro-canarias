type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
};

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${dark ? "text-white" : ""}`}
    >
      {label && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-accent-light" : "text-accent"}`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/60" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
