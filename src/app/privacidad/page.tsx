import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

// BORRADOR: completar los datos entre corchetes y revisar con una asesoría antes de publicar.
export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>
        {site.founder} ({site.name}), NIF [PENDIENTE], domicilio [PENDIENTE]. Email de contacto: {site.email}.
      </p>

      <h2>Qué datos tratamos y para qué</h2>
      <p>
        Los datos que nos envías en el formulario del Mapa de Producción Perdida (nombre, email, teléfono, datos de la
        clínica y mensaje) se usan para preparar el diagnóstico solicitado y contactarte en relación con él.
      </p>
      <p>
        Los datos de agenda que nos facilites para el análisis deben estar anonimizados o limitarse a lo necesario
        (fechas, horas, estado de la cita, tipo de tratamiento y profesional). No necesitamos datos de salud de los
        pacientes.
      </p>

      <h2>Base legal</h2>
      <p>Tu consentimiento, que das al marcar la casilla del formulario y puedes retirar en cualquier momento.</p>

      <h2>Conservación</h2>
      <p>
        Conservamos los datos mientras exista una relación comercial o hasta que solicites su supresión, y como máximo
        [PENDIENTE: plazo] si no llegamos a colaborar.
      </p>

      <h2>Destinatarios</h2>
      <p>No cedemos datos a terceros salvo obligación legal. Utilizamos estos proveedores como encargados del tratamiento:</p>
      <ul>
        <li>Alojamiento web: [PENDIENTE, por ejemplo Vercel Inc.].</li>
        <li>Envío de emails del formulario: [PENDIENTE, por ejemplo Resend].</li>
      </ul>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
        escribiendo a {site.email}. Si consideras que no hemos atendido tu solicitud, puedes reclamar ante la Agencia
        Española de Protección de Datos (aepd.es).
      </p>
    </LegalPage>
  );
}
