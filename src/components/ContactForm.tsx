"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import WhatsAppButton from "./WhatsAppButton";
import SectionHeader from "./SectionHeader";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    zona: "",
    metros: "",
    mensaje: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const message = [
      "Hola VinylPro Canarias, quiero pedir presupuesto:",
      "",
      `Nombre: ${form.nombre}`,
      `Teléfono: ${form.telefono}`,
      `Zona: ${form.zona}`,
      `Metros aproximados: ${form.metros} m²`,
      form.mensaje ? `Mensaje: ${form.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  const fields = [
    { id: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre" },
    {
      id: "telefono",
      label: "Teléfono",
      type: "tel",
      placeholder: "600 000 000",
    },
    {
      id: "zona",
      label: "Zona",
      type: "text",
      placeholder: "Las Palmas, Telde, Vecindario...",
    },
    {
      id: "metros",
      label: "Metros aproximados",
      type: "text",
      placeholder: "Ej. 45 m²",
    },
  ] as const;

  return (
    <section id="contacto" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          label="Contacto"
          title="Pide tu presupuesto"
          description="Cuéntanos tu proyecto y te respondemos por WhatsApp con la mayor brevedad."
        />

        <div className="mx-auto mt-12 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required={field.id !== "metros"}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="mensaje"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                placeholder="Cuéntanos qué espacio quieres renovar..."
                value={form.mensaje}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, mensaje: e.target.value }))
                }
                className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark"
            >
              Enviar y abrir WhatsApp
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="mb-4 text-sm text-muted">O escríbenos directamente</p>
            <WhatsAppButton variant="secondary" fullWidth />
          </div>
        </div>
      </div>
    </section>
  );
}
