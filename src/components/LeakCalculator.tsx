"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { euro } from "@/lib/site";

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function LeakCalculator() {
  const [lost, setLost] = useState(20);
  const [value, setValue] = useState(120);
  const lostId = useId();
  const valueId = useId();

  const monthly = lost * value;

  return (
    <div className="grid overflow-hidden rounded-xl border border-line md:grid-cols-2">
      <div className="space-y-6 bg-white p-6 sm:p-8">
        <div className="space-y-2">
          <label htmlFor={lostId} className="block font-display font-semibold text-navy">
            Cancelaciones tardías y ausencias al mes
          </label>
          <input
            id={lostId}
            type="number"
            inputMode="numeric"
            min={0}
            max={500}
            value={lost}
            onChange={(e) => setLost(clamp(e.target.valueAsNumber, 0, 500))}
            className="w-full rounded-md border border-line px-4 py-3 text-lg text-ink transition-colors duration-200 hover:border-steel/60 focus:border-navy"
          />
          <p className="text-sm text-steel">Las que no se llegaron a recolocar en la agenda.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor={valueId} className="block font-display font-semibold text-navy">
            Valor medio de una cita (€)
          </label>
          <input
            id={valueId}
            type="number"
            inputMode="numeric"
            min={0}
            max={5000}
            step={10}
            value={value}
            onChange={(e) => setValue(clamp(e.target.valueAsNumber, 0, 5000))}
            className="w-full rounded-md border border-line px-4 py-3 text-lg text-ink transition-colors duration-200 hover:border-steel/60 focus:border-navy"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 bg-navy p-6 text-white sm:p-8">
        <div aria-live="polite" className="space-y-6">
          <div>
            <p className="text-sm text-white/70">Producción expuesta al mes</p>
            <p key={monthly} className="number-update font-display text-5xl font-bold text-green">
              {euro(monthly)}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/70">En un año</p>
            <p key={monthly * 12} className="number-update font-display text-3xl font-semibold text-green">
              {euro(monthly * 12)}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-white/75">
            Es una cuenta rápida. El Mapa de Producción Perdida la hace con los datos reales de tu agenda: qué días,
            franjas, profesionales y tratamientos concentran la fuga.
          </p>
          <Link href="/mapa-gratuito" className="btn-primary w-full sm:w-auto">
            Calcular con mis datos reales
          </Link>
        </div>
      </div>
    </div>
  );
}
