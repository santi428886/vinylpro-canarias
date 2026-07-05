"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

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
    { id: "nombre", label: "Nombre", type: "text", placeholder: "Tu nombre", required: true },
    { id: "telefono", label: "Teléfono", type: "tel", placeholder: "600 000 000", required: true },
    { id: "zona", label: "Zona", type: "text", placeholder: "Las Palmas, Telde, Vecindario...", required: true },
    { id: "metros", label: "Metros aproximados", type: "text", placeholder: "Ej. 45 m²", required: false },
  ] as const;

  return (
    <FadeIn>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={form[field.id]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        ))}

        <div>
          <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium">
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
            className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Enviar y abrir WhatsApp
        </Button>
      </form>
    </FadeIn>
  );
}
