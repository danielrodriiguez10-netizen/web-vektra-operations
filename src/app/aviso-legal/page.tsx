import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

// BORRADOR: completar los datos entre corchetes y revisar con una asesoría antes de publicar.
export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal">
      <h2>Titular del sitio web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información (LSSI-CE), se informa de que
        este sitio web, {site.url.replace("https://", "")}, es titularidad de {site.founder}, NIF [PENDIENTE],
        con domicilio en [PENDIENTE]. Email: {site.email}.
      </p>

      <h2>Objeto</h2>
      <p>
        Este sitio informa sobre los servicios de automatización de agendas para clínicas dentales de {site.name}.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, el logotipo, el diseño y el resto de contenidos de este sitio pertenecen a su titular. No se
        permite su reproducción sin autorización expresa.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Las cifras y ejemplos que aparecen en la web son ilustrativos. Los resultados de cada clínica dependen de sus
        datos reales, que se miden desde una línea base acordada.
      </p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </LegalPage>
  );
}
