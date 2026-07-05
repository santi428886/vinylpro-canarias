type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  variant?: "default" | "light";
};

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  variant = "default",
}: SectionHeaderProps) {
  const isLight = variant === "light";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {label && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-widest ${isLight ? "text-accent-light" : "text-accent"}`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl ${isLight ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed sm:text-lg ${isLight ? "text-white/65" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
