import type { Metadata } from "next";
import { MapaForm } from "./MapaForm";

export const metadata: Metadata = {
  title: "Mapa de Producción Perdida gratis para clínicas dentales",
  description:
    "Descubre cuánto dinero pierde tu clínica dental cada mes por cancelaciones, ausencias y huecos sin rellenar. Diagnóstico gratuito con los datos de tus últimos 30 días.",
  alternates: { canonical: "/mapa-gratuito" },
};

const includes = [
  "Revisión de los últimos 30 días de tu agenda.",
  "Cálculo de ausencias, cancelaciones tardías y huecos que no se rellenaron.",
  "Producción potencial en riesgo según el valor medio de tus citas.",
  "Qué días, franjas, profesionales o tratamientos concentran más incidencias.",
  "Informe ejecutivo de una página, en un máximo de 48 horas.",
];

const steps = [
  { title: "Rellenas este formulario", text: "Dos minutos. Solo datos básicos de la clínica." },
  {
    title: "Te enviamos una plantilla",
    text: "Exportas los últimos 30 días de agenda desde tu software o los rellenas en la plantilla.",
  },
  { title: "Recibes tu Mapa", text: "Un informe de una página con la cifra y dónde se concentra la fuga." },
];

export default function MapaGratuitoPage() {
  return (
    <div className="bg-mist">
      <div className="hero-enter container-page grid gap-12 py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="font-display text-sm font-semibold text-steel">Diagnóstico gratuito</p>
            <h1 className="text-4xl font-bold sm:text-5xl">Mapa de Producción Perdida</h1>
            <p className="max-w-prose text-lg">
              Convierte la sospecha de &ldquo;perdemos citas&rdquo; en una cifra: cuánto dinero se le escapa a tu
              clínica cada mes por cancelaciones y huecos que no se rellenan.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Qué recibes</h2>
            <ul className="space-y-2">
              {includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Cómo funciona</h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{step.title}</p>
                    <p className="text-sm text-steel">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-sm text-steel">
            No incluye implementación ni configuración de WhatsApp. Es un diagnóstico para saber si tienes un problema
            de agenda que merezca la pena resolver. Si la fuga es pequeña, te lo diremos.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold">Pide tu Mapa</h2>
          <MapaForm />
        </div>
      </div>
    </div>
  );
}
