import type { Metadata } from "next";
import Link from "next/link";
import { AgendaDemo } from "@/components/AgendaDemo";
import { LeakCalculator } from "@/components/LeakCalculator";
import { euro, offer, site } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const pains = [
  {
    title: "Cancelaciones de última hora",
    text: "El tiempo de sillón ya estaba reservado y no queda margen para reaccionar.",
  },
  {
    title: "Pacientes que no se presentan",
    text: "Personal, sillón y material preparados para una cita que no llega.",
  },
  {
    title: "Huecos que nadie consigue llenar",
    text: "Hay pacientes esperando, pero la lista no está al día ni separada por tratamiento o profesional.",
  },
  {
    title: "Recepción desbordada",
    text: "Teléfono, WhatsApp, confirmaciones y reprogramaciones a la vez, mientras atiende a quien está delante.",
  },
  {
    title: "Sin una cifra clara",
    text: "Sabes que las sillas vacías cuestan dinero, pero no cuánto se pierde cada mes.",
  },
];

const fronts = [
  {
    title: "Prevención",
    text: "Detectamos las citas con más riesgo (primeras visitas, tratamientos largos, pacientes con ausencias previas) y enviamos confirmaciones personalizadas 48 y 24 horas antes. Si no hay respuesta, se activa un seguimiento automático.",
  },
  {
    title: "Recuperación",
    text: "Cuando alguien cancela, recibe al momento un mensaje para reprogramar. Si no responde en 2 horas, un segundo mensaje. Si a las 24 horas sigue sin respuesta, recepción recibe un aviso para llamarle.",
  },
  {
    title: "Rellenado",
    text: "Una lista de espera ordenada por tratamiento, disponibilidad, profesional y prioridad. Cuando se libera un hueco, se ofrece a los 3 a 5 pacientes más adecuados y se lo queda el primero que confirma.",
  },
  {
    title: "Medición",
    text: "Un panel con citas confirmadas, cancelaciones recuperadas, huecos rellenados, tiempo ahorrado a recepción y producción protegida. Sabes cada mes qué está funcionando.",
  },
];

const steps = [
  {
    title: "Medimos la fuga",
    text: "Con el Mapa de Producción Perdida calculamos cuánto se pierde hoy y dónde. Esa cifra es la línea base.",
  },
  {
    title: "Instalamos el sistema",
    text: "Lo adaptamos a tu agenda, tu equipo y tu software actual. Recepción recibe formación y los mensajes los validas tú.",
  },
  {
    title: "Optimizamos y demostramos",
    text: "Ajustamos con datos reales durante 90 días y te enseñamos, con números, lo que el sistema está recuperando.",
  },
];

const faqs = [
  {
    q: "Ya probé con una agencia y no sirvió de nada. ¿En qué se diferencia esto?",
    a: "No hacemos publicidad ni captamos pacientes nuevos. Trabajamos con la demanda que tu clínica ya tiene: primero medimos cuánto cuesta tu agenda actual y después diseñamos el proceso sobre tus datos.",
  },
  {
    q: "¿Funciona con nuestro software de gestión?",
    a: "Depende del software, y no te diremos que sí sin comprobarlo. Antes de proponerte nada revisamos qué programa usáis, si permite exportar citas y si tiene integración. Si no la tiene, te ofrecemos una versión semiautomática y te explicamos exactamente qué incluye.",
  },
  {
    q: "5.000 € es mucho dinero. ¿Cómo sé si me compensa?",
    a: "Por eso empezamos con el Mapa gratuito. Si tu clínica pierde, por ejemplo, 20 citas al mes con un valor medio de 120 €, hay 2.400 € al mes expuestos. Con la cifra real delante decides tú. Y si la fuga no es relevante, te diremos que no necesitas la implementación.",
  },
  {
    q: "¿Qué resultados me garantizáis?",
    a: "No prometemos una cifra concreta de citas recuperadas. El objetivo es que la producción protegida y recuperada justifique la inversión en 90 días, medida desde la línea base que acordamos al principio.",
  },
  {
    q: "¿Esto sustituye a mi recepcionista?",
    a: "No. Recepción sigue siendo clave. El sistema se encarga de las confirmaciones y los avisos repetitivos, y recepción interviene solo en los casos que necesitan a una persona.",
  },
  {
    q: "No tengo tiempo para empezar un proyecto ahora.",
    a: "Nosotros preparamos el proceso y formamos al equipo. Tu parte es aportar los datos de agenda y validar los mensajes que se enviarán a tus pacientes. Sí necesitamos que el equipo siga el protocolo acordado.",
  },
  {
    q: "¿Tenéis casos de éxito?",
    a: "Estamos empezando con las primeras clínicas. Por eso trabajamos con alcance y precio cerrados, medimos desde una línea base verificable y te enseñamos los números mes a mes, sin inventar referencias.",
  },
];

const fitsYes = [
  "Tienes dos o más sillones y una agenda con actividad.",
  "Las cancelaciones y ausencias se repiten cada semana.",
  "Recepción no llega a confirmar ni a llamar a la lista de espera.",
];

const fitsNo = [
  "Buscas captar pacientes nuevos con publicidad.",
  "Quieres cambiar de software de gestión.",
  "Tu agenda casi nunca tiene huecos sin cubrir.",
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        email: site.email,
        founder: { "@type": "Person", name: site.founder },
        slogan: site.tagline,
      },
      {
        "@type": "Service",
        name: "Agenda Dental Blindada",
        serviceType: "Automatización de agenda para clínicas dentales",
        provider: { "@id": `${site.url}/#org` },
        areaServed: { "@type": "Country", name: "España" },
        offers: [
          {
            "@type": "Offer",
            name: "Mapa de Producción Perdida",
            price: 0,
            priceCurrency: "EUR",
            url: `${site.url}/mapa-gratuito`,
          },
          {
            "@type": "Offer",
            name: "Agenda Dental Blindada (90 días)",
            price: offer.total,
            priceCurrency: "EUR",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />

      {/* Portada */}
      <section className="overflow-hidden">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <div className="hero-enter space-y-7">
            <h1 className="text-[2.35rem] font-bold sm:text-5xl lg:text-[3.4rem]">
              Menos sillas vacías en tu clínica dental, sin cargar más trabajo a recepción
            </h1>
            <p className="max-w-xl text-lg sm:text-xl">
              Confirmamos citas, recuperamos cancelaciones y llenamos los huecos con tu lista de espera.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:whitespace-nowrap">
              <Link href="/mapa-gratuito" className="btn-strong">
                Descubrir cuánto pierde mi clínica
              </Link>
              <Link href="#como-funciona" className="btn-secondary">
                Ver cómo funciona
              </Link>
            </div>
            <p className="text-sm text-steel">
              Diagnóstico gratuito para clínicas con dos o más sillones. Informe en 48 horas.
            </p>
          </div>

          <AgendaDemo />
        </div>
      </section>

      {/* Problema */}
      <section className="bg-mist py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div data-reveal className="space-y-5">
            <h2 className="text-3xl font-bold sm:text-4xl">
              &ldquo;Tenemos pacientes, pero la agenda se nos desordena y recepción no llega a todo.&rdquo;
            </h2>
            <p className="max-w-md text-lg">
              Si esta frase te suena, el problema no es la demanda. Es que cada cancelación depende de que alguien tenga
              tiempo de coger el teléfono.
            </p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {pains.map((pain, i) => (
              <li
                key={pain.title}
                data-reveal
                style={revealDelay(i, 60)}
                className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <h3 className="text-lg font-semibold">{pain.title}</h3>
                <p>{pain.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-16 sm:py-24" aria-labelledby="calculadora">
        <div className="container-page space-y-10">
          <div data-reveal className="max-w-2xl space-y-4">
            <h2 id="calculadora" className="text-3xl font-bold sm:text-4xl">
              ¿Cuánto te cuesta un hueco vacío?
            </h2>
            <p className="text-lg">
              Pon tus números aproximados. Es la misma cuenta que hacemos en el Mapa, pero con datos reales.
            </p>
          </div>
          <div data-reveal>
            <LeakCalculator />
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-navy py-16 text-white sm:py-24">
        <div className="container-page space-y-14">
          <div data-reveal className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Primero medimos la fuga. Después instalamos el sistema. Finalmente demostramos lo que recuperas.
            </h2>
          </div>

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={revealDelay(i, 120)}
                className="space-y-3 border-t-2 border-green pt-5"
              >
                <p className="font-display text-sm font-semibold text-green">Paso {i + 1}</p>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-white/80">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="space-y-8 border-t border-white/15 pt-14">
            <h2 data-reveal className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
              El sistema protege tu agenda en cuatro frentes
            </h2>
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {fronts.map((front, i) => (
                <div key={front.title} data-reveal style={revealDelay(i)} className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">{front.title}</h3>
                  <p className="text-white/80">{front.text}</p>
                </div>
              ))}
            </div>
            <p className="max-w-2xl text-white/70">
              Sin cambiar vuestro software de gestión. Tus pacientes siguen hablando con la clínica por WhatsApp, como
              ahora.
            </p>
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="py-16 sm:py-24">
        <div className="container-page space-y-12">
          <div data-reveal className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Dos pasos, sin sorpresas</h2>
            <p className="text-lg">
              Empiezas con un diagnóstico gratuito. Si la cifra justifica actuar, te proponemos la implementación.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
            {/* Mapa gratuito */}
            <div data-reveal className="flex min-w-0">
              <article className="card-hover flex min-w-0 flex-1 flex-col rounded-xl border-2 border-line p-6 hover:border-navy/25 sm:p-8">
                <h3 className="text-2xl font-bold">Mapa de Producción Perdida</h3>
                <p className="mt-2 font-display text-4xl font-bold text-navy">Gratis</p>
                <p className="mt-4">
                  Analizamos los últimos 30 días de tu agenda y te entregamos un informe de una página con la producción
                  en riesgo y dónde se concentra.
                </p>
                <ul className="mt-6 space-y-2 text-[0.95rem]">
                  <li>Ausencias, cancelaciones tardías y huecos sin rellenar.</li>
                  <li>Días, franjas, profesionales y tratamientos con más incidencias.</li>
                  <li>Entrega en un máximo de 48 horas.</li>
                </ul>
                <div className="mt-auto pt-8">
                  <Link href="/mapa-gratuito" className="btn-secondary w-full">
                    Pedir mi Mapa gratis
                  </Link>
                </div>
              </article>
            </div>

            {/* Agenda Dental Blindada */}
            <div data-reveal style={revealDelay(1, 120)} className="flex min-w-0">
              <article className="card-hover flex min-w-0 flex-1 flex-col rounded-xl bg-navy p-6 text-white sm:p-8">
                <h3 className="text-2xl font-bold text-white">Agenda Dental Blindada</h3>
                <p className="mt-2 font-display text-4xl font-bold text-green">
                  {euro(offer.total)} <span className="text-lg font-medium text-white/70">en {offer.days} días</span>
                </p>
                <p className="mt-4 text-white/85">
                  Implementación gestionada del sistema completo: prevención, recuperación, lista de espera y medición.
                  Lo diseñamos, lo configuramos, formamos a tu equipo y lo optimizamos contigo.
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[26rem] text-left text-sm">
                    <caption className="sr-only">Estructura de pagos de Agenda Dental Blindada</caption>
                    <thead className="text-white/60">
                      <tr>
                        <th scope="col" className="pb-2 font-medium">
                          Fase
                        </th>
                        <th scope="col" className="pb-2 font-medium">
                          Inversión
                        </th>
                        <th scope="col" className="pb-2 font-medium">
                          Resultado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/15 border-t border-white/15">
                      {offer.months.map((m) => (
                        <tr key={m.label}>
                          <th scope="row" className="py-3 pr-4 align-top font-semibold text-white">
                            {m.label}
                            <span className="block font-normal text-white/60">{m.name}</span>
                          </th>
                          <td className="py-3 pr-4 align-top font-semibold text-green">{euro(m.price)}</td>
                          <td className="py-3 align-top text-white/80">{m.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 text-sm text-white/75">
                  El objetivo es que la producción protegida y recuperada justifique la inversión en 90 días, medida
                  desde una línea base acordada. No incluye captación de pacientes, gestión de llamadas entrantes ni
                  cambios en tu software de gestión.
                </p>

                <div className="mt-auto space-y-3 pt-8">
                  <Link href="/mapa-gratuito" className="btn-primary w-full">
                    Empezar por el Mapa gratuito
                  </Link>
                  <p className="text-center text-sm text-white/70">
                    Aceptamos {site.monthlySlots} clínicas nuevas al mes para cuidar cada implementación.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div data-reveal className="grid gap-8 rounded-xl bg-mist p-6 sm:p-8 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Es para tu clínica si…</h3>
              <ul className="space-y-2">
                {fitsYes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">No es para tu clínica si…</h3>
              <ul className="space-y-2">
                {fitsNo.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-steel" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="border-t border-line py-16 sm:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <h2 data-reveal className="text-3xl font-bold sm:text-4xl">
            Quién está detrás
          </h2>
          <div data-reveal style={revealDelay(1, 120)} className="max-w-prose space-y-4 text-lg">
            <p>
              Soy {site.founder}, fundador de Vektra Operations. Me dedico a una sola cosa: que las clínicas dentales
              dejen de perder producción por huecos que nadie tuvo tiempo de llenar.
            </p>
            <p>
              No vendo publicidad ni prometo magia. Te enseño primero cuánto se está perdiendo, instalo un sistema
              adaptado a tu clínica y te muestro con números lo que recupera.
            </p>
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section id="preguntas" className="bg-mist py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 data-reveal className="text-3xl font-bold sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <div data-reveal style={revealDelay(1, 120)} className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="mt-1 text-2xl leading-none text-steel transition-[transform,color] duration-300 group-open:rotate-45 group-hover:text-navy"
                  >
                    +
                  </span>
                </summary>
                <p className="faq-answer mt-3 max-w-prose">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-16 sm:py-24">
        <div
          data-reveal
          className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Descubre cuánto dinero pierde tu clínica cada mes por citas canceladas y huecos que no se rellenan
            </h2>
            <p className="text-lg">Gratis, con tus datos reales y en 48 horas.</p>
          </div>
          <Link href="/mapa-gratuito" className="btn-strong shrink-0">
            Pedir mi Mapa gratis
          </Link>
        </div>
      </section>
    </>
  );
}
