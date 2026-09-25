"use server";

import { site } from "@/lib/site";

export type MapaFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

type Field = "nombre" | "email" | "telefono" | "clinica" | "ciudad" | "sillones" | "software" | "mensaje" | "privacidad";

const CHAIRS = ["1", "2", "3-4", "5+"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function requestMapa(_prev: MapaFormState, formData: FormData): Promise<MapaFormState> {
  // Campo trampa invisible: los bots lo rellenan, las personas no.
  if (text(formData, "web", 200)) {
    return { status: "success", message: "Solicitud recibida." };
  }

  const values = {
    nombre: text(formData, "nombre", 120),
    email: text(formData, "email", 200),
    telefono: text(formData, "telefono", 30),
    clinica: text(formData, "clinica", 160),
    ciudad: text(formData, "ciudad", 120),
    sillones: text(formData, "sillones", 10),
    software: text(formData, "software", 120),
    mensaje: text(formData, "mensaje", 1500),
  };

  const errors: MapaFormState["errors"] = {};
  if (!values.nombre) errors.nombre = "Escribe tu nombre.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Escribe un email válido, por ejemplo nombre@clinica.es.";
  if (values.telefono && !/^[+\d\s().-]{6,30}$/.test(values.telefono))
    errors.telefono = "Revisa el teléfono: solo números, espacios y el prefijo +.";
  if (!values.clinica) errors.clinica = "Escribe el nombre de la clínica.";
  if (!values.ciudad) errors.ciudad = "Indica la ciudad de la clínica.";
  if (!CHAIRS.includes(values.sillones)) errors.sillones = "Elige cuántos sillones tiene la clínica.";
  if (formData.get("privacidad") !== "on") errors.privacidad = "Necesitamos tu consentimiento para contactarte.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const body = [
    "Nueva solicitud de Mapa de Producción Perdida",
    "",
    `Nombre: ${values.nombre}`,
    `Email: ${values.email}`,
    `Teléfono: ${values.telefono || "-"}`,
    `Clínica: ${values.clinica}`,
    `Ciudad: ${values.ciudad}`,
    `Sillones: ${values.sillones}`,
    `Software de gestión: ${values.software || "-"}`,
    "",
    "Mensaje:",
    values.mensaje || "-",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mapa-gratuito] Envío de email sin configurar. Solicitud:\n${body}`);
      return successState();
    }
    console.error("[mapa-gratuito] Faltan RESEND_API_KEY, LEADS_TO_EMAIL o LEADS_FROM_EMAIL.");
    return {
      status: "error",
      message: `No hemos podido enviar la solicitud. Escríbenos a ${site.email} y lo gestionamos por email.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Mapa gratuito: ${values.clinica} (${values.ciudad})`,
        text: body,
      }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
  } catch (error) {
    console.error("[mapa-gratuito] Error al enviar el email", error);
    return {
      status: "error",
      message: `No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos a ${site.email}.`,
      values,
    };
  }

  return successState();
}

function successState(): MapaFormState {
  return {
    status: "success",
    message:
      "Solicitud recibida. Te escribiremos por email con una plantilla sencilla para exportar los últimos 30 días de tu agenda. Con esos datos, tienes el Mapa en un máximo de 48 horas.",
  };
}
