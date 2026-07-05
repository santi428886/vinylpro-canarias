import FadeIn from "@/components/ui/FadeIn";

export default function GranCanariaMap() {
  return (
    <FadeIn>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-accent/10 via-surface to-accent/5 sm:aspect-[16/10]">
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full p-8"
            aria-label="Mapa de Gran Canaria"
          >
            <ellipse
              cx="200"
              cy="150"
              rx="120"
              ry="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent/40"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="80"
              ry="50"
              fill="currentColor"
              className="text-accent/10"
            />
            {[
              { cx: 180, cy: 120, label: "Las Palmas" },
              { cx: 220, cy: 140, label: "Telde" },
              { cx: 195, cy: 165, label: "Valsequillo" },
              { cx: 160, cy: 180, label: "Vecindario" },
              { cx: 200, cy: 200, label: "Maspalomas" },
            ].map((point) => (
              <g key={point.label}>
                <circle cx={point.cx} cy={point.cy} r="5" className="fill-accent" />
                <circle cx={point.cx} cy={point.cy} r="10" className="fill-accent/20" />
                <text
                  x={point.cx}
                  y={point.cy - 12}
                  textAnchor="middle"
                  className="fill-foreground text-[10px] font-medium"
                >
                  {point.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="border-t border-border p-5">
          <p className="text-sm font-medium text-foreground">
            Servicio en toda Gran Canaria
          </p>
          <p className="mt-1 text-sm text-muted">
            Las Palmas, Telde, Valsequillo, Vecindario, Maspalomas y alrededores.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
