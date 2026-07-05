import { includedItems } from "@/data/catalog";
import SectionHeader from "./SectionHeader";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-accent"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function IncludedPrice() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Transparencia"
          title="Qué incluye el precio"
          description="Sin sorpresas. Cada m² incluye todo lo necesario para estrenar suelo."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <ul className="space-y-4">
            {includedItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <CheckIcon />
                </div>
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
            <strong>Nota:</strong> El precio puede variar según nivelación,
            rodapiés, retirada de suelo anterior o estado del pavimento.
          </p>
        </div>
      </div>
    </section>
  );
}
