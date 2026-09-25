"use client";

import { useState } from "react";

type Slot = { chair: 1 | 2; start: number; span: number; name: string; treatment: string };

// Filas de 30 minutos desde las 09:00. Pacientes ficticios.
const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

const slots: Slot[] = [
  { chair: 1, start: 0, span: 2, name: "Ana R.", treatment: "Revisión y limpieza" },
  { chair: 1, start: 2, span: 3, name: "Jorge P.", treatment: "Endodoncia" },
  { chair: 1, start: 5, span: 1, name: "Lucía F.", treatment: "Revisión" },
  { chair: 1, start: 6, span: 2, name: "Pablo S.", treatment: "Empaste" },
  { chair: 2, start: 0, span: 1, name: "Carmen V.", treatment: "Urgencia" },
  { chair: 2, start: 1, span: 2, name: "Iván M.", treatment: "Limpieza" },
  { chair: 2, start: 5, span: 3, name: "Elena B.", treatment: "Ortodoncia" },
];

// El hueco que se cancela y se recupera: sillón 2, 10:30–11:30.
const target = { chair: 2 as const, start: 3, span: 2 };

const ROW = "2.75rem";

function position(chair: number, start: number, span: number) {
  return {
    gridColumn: chair + 1,
    gridRow: `${start + 2} / span ${span}`,
  };
}

export function AgendaDemo() {
  const [run, setRun] = useState(0);

  return (
    <figure className="rounded-xl border border-line bg-white p-4 shadow-[0_24px_60px_-30px_rgba(15,44,74,0.45)] sm:p-5">
      <div key={run}>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p className="font-display text-sm font-semibold text-navy">Agenda del martes</p>
          <p className="text-xs text-steel">2 sillones</p>
        </div>

        <div
          aria-hidden="true"
          className="grid gap-x-2 gap-y-1 text-[0.7rem] leading-tight sm:text-xs"
          style={{ gridTemplateColumns: "2.75rem 1fr 1fr", gridTemplateRows: `auto repeat(8, ${ROW})` }}
        >
          <span />
          <span className="pb-1 font-semibold text-steel">Sillón 1</span>
          <span className="pb-1 font-semibold text-steel">Sillón 2</span>

          {hours.map((h, i) => (
            <span key={h} className="pt-1 text-steel" style={{ gridColumn: 1, gridRow: i + 2 }}>
              {h}
            </span>
          ))}

          {slots.map((s) => (
            <div
              key={s.name}
              className="overflow-hidden rounded-md border-l-[3px] border-navy bg-mist px-2 py-1"
              style={position(s.chair, s.start, s.span)}
            >
              <p className="font-semibold text-navy">{s.name}</p>
              <p className="text-steel">{s.treatment}</p>
            </div>
          ))}

          <div className="relative" style={position(target.chair, target.start, target.span)}>
            <div className="agenda-confirmed absolute inset-0 rounded-md border-l-[3px] border-navy bg-mist px-2 py-1">
              <p className="font-semibold text-navy">Sergio L.</p>
              <p className="text-steel">Revisión de implante</p>
            </div>
            <div className="agenda-cancelled absolute inset-0 rounded-md border-2 border-dashed border-steel/60 bg-white px-2 py-1">
              <p className="font-semibold text-ink">Hueco libre</p>
              <p className="agenda-offer text-steel">Ofreciendo a la lista de espera</p>
            </div>
            <div className="agenda-filled absolute inset-0 rounded-md bg-green px-2 py-1 text-navy">
              <p className="font-semibold">Marta G.</p>
              <p>Limpieza, desde lista de espera</p>
            </div>
          </div>
        </div>

        <ol className="agenda-log mt-4 space-y-1.5 border-t border-line pt-3 text-xs text-ink sm:text-[0.8rem]">
          <li>
            <span className="font-semibold text-steel">08:12</span> Sergio L. cancela su cita de las 10:30 por
            WhatsApp.
          </li>
          <li>
            <span className="font-semibold text-steel">08:12</span> El hueco se ofrece a 4 pacientes de la lista de
            espera con tratamiento y horario compatibles.
          </li>
          <li>
            <span className="font-semibold text-steel">08:19</span> Marta G. confirma. Recepción no ha tenido que
            hacer ninguna llamada.
          </li>
        </ol>
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-steel">
        <span>Ejemplo ilustrativo con pacientes ficticios.</span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="rounded px-2 py-1 font-semibold text-navy underline underline-offset-4 hover:bg-mist"
        >
          Ver de nuevo
        </button>
      </figcaption>
    </figure>
  );
}
