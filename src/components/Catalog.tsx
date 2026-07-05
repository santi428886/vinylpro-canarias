import { floorCatalog } from "@/data/catalog";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function Catalog() {
  return (
    <section id="catalogo" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Catálogo"
          title="Modelos de suelo vinílico"
          description="Precio por m² con material e instalación incluidos. Elige tu estilo y pídenos presupuesto al instante."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {floorCatalog.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
