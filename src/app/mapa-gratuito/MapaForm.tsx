"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestMapa, type MapaFormState } from "./actions";

const initialState: MapaFormState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-ink transition-colors duration-200 hover:border-steel/60 focus:border-navy aria-[invalid=true]:border-[#c0392b]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-[#a93226]">
      {message}
    </p>
  );
}

export function MapaForm() {
  const [state, formAction, pending] = useActionState(requestMapa, initialState);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border-l-4 border-green bg-mist p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Solicitud recibida</h2>
        <p className="mt-3 max-w-prose">{state.message}</p>
        <Link href="/" className="btn-secondary mt-6">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const field = (name: keyof NonNullable<MapaFormState["errors"]>) => ({
    id: name,
    name,
    "aria-invalid": e[name] ? true : undefined,
    "aria-describedby": e[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={formAction} noValidate className="space-y-6">
      {state.status === "error" && (
        <p role="alert" className="rounded-md bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#a93226]">
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="nombre" className="block font-semibold text-navy">
            Tu nombre
          </label>
          <input {...field("nombre")} type="text" autoComplete="name" required defaultValue={v.nombre} className={inputClass} />
          <FieldError id="nombre-error" message={e.nombre} />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-semibold text-navy">
            Email
          </label>
          <input {...field("email")} type="email" autoComplete="email" required defaultValue={v.email} className={inputClass} />
          <FieldError id="email-error" message={e.email} />
        </div>

        <div className="space-y-2">
          <label htmlFor="clinica" className="block font-semibold text-navy">
            Nombre de la clínica
          </label>
          <input {...field("clinica")} type="text" autoComplete="organization" required defaultValue={v.clinica} className={inputClass} />
          <FieldError id="clinica-error" message={e.clinica} />
        </div>

        <div className="space-y-2">
          <label htmlFor="ciudad" className="block font-semibold text-navy">
            Ciudad
          </label>
          <input {...field("ciudad")} type="text" autoComplete="address-level2" required defaultValue={v.ciudad} className={inputClass} />
          <FieldError id="ciudad-error" message={e.ciudad} />
        </div>

        <div className="space-y-2">
          <label htmlFor="sillones" className="block font-semibold text-navy">
            Sillones en la clínica
          </label>
          <select {...field("sillones")} required defaultValue={v.sillones ?? ""} className={inputClass}>
            <option value="" disabled>
              Elige una opción
            </option>
            <option value="1">1 sillón</option>
            <option value="2">2 sillones</option>
            <option value="3-4">3 o 4 sillones</option>
            <option value="5+">5 o más sillones</option>
          </select>
          <FieldError id="sillones-error" message={e.sillones} />
        </div>

        <div className="space-y-2">
          <label htmlFor="telefono" className="block font-semibold text-navy">
            Teléfono <span className="font-normal text-steel">(opcional)</span>
          </label>
          <input {...field("telefono")} type="tel" autoComplete="tel" defaultValue={v.telefono} className={inputClass} />
          <FieldError id="telefono-error" message={e.telefono} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="software" className="block font-semibold text-navy">
          Software de gestión que usáis <span className="font-normal text-steel">(opcional)</span>
        </label>
        <input
          {...field("software")}
          type="text"
          placeholder="Por ejemplo: Gesden, Clinic Cloud, Dentalink…"
          defaultValue={v.software}
          className={inputClass}
        />
        <p className="text-sm text-steel">Nos ayuda a preparar la plantilla de exportación correcta.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="mensaje" className="block font-semibold text-navy">
          ¿Algo que debamos saber? <span className="font-normal text-steel">(opcional)</span>
        </label>
        <textarea {...field("mensaje")} rows={4} defaultValue={v.mensaje} className={inputClass} />
      </div>

      {/* Campo trampa para bots: oculto a personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="web">No rellenes este campo</label>
        <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            {...field("privacidad")}
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-navy"
          />
          <label htmlFor="privacidad" className="text-sm">
            Acepto que Vektra Operations use estos datos para preparar el Mapa y contactarme sobre él, según la{" "}
            <Link href="/privacidad" className="font-semibold text-navy underline underline-offset-2">
              política de privacidad
            </Link>
            .
          </label>
        </div>
        <FieldError id="privacidad-error" message={e.privacidad} />
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
        {pending ? "Enviando solicitud…" : "Pedir mi Mapa gratis"}
      </button>
    </form>
  );
}
