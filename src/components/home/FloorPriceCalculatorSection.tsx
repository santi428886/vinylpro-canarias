import FadeIn from "@/components/ui/FadeIn";
import FloorPriceCalculator from "@/components/shared/FloorPriceCalculator";

export default function FloorPriceCalculatorSection() {
  return (
    <section className="bg-surface py-20 sm:py-28" aria-labelledby="calculator-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <p id="calculator-heading" className="sr-only">
            Calculadora de presupuesto
          </p>
          <FloorPriceCalculator />
        </FadeIn>
      </div>
    </section>
  );
}
