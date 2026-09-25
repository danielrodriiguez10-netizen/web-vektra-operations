// Datos de negocio centralizados. Cambia aquí el email, precios o textos legales
// y se actualizan en toda la web.
export const site = {
  name: "Vektra Operations",
  url: "https://vektraoperations.com",
  // PENDIENTE: confirmar que este buzón existe antes de publicar.
  email: "hola@vektraoperations.com",
  founder: "Daniel Rodriguez",
  tagline: "Tu agenda dental, siempre llena. Sin caos.",
  description:
    "Ayudamos a clínicas dentales con dos o más sillones a confirmar citas, recuperar cancelaciones y activar su lista de espera para que los huecos no se conviertan en producción perdida.",
  // Plazas de implementación por mes (urgencia real, no inventada).
  monthlySlots: 3,
} as const;

export const offer = {
  total: 5000,
  days: 90,
  months: [
    {
      label: "Mes 1",
      name: "Puesta en marcha",
      price: 2000,
      result: "Sistema diseñado, configurado, probado y equipo formado.",
    },
    {
      label: "Mes 2",
      name: "Gestión y optimización",
      price: 1500,
      result: "Ajustes con datos reales de tu agenda y primera medición.",
    },
    {
      label: "Mes 3",
      name: "Gestión y optimización",
      price: 1500,
      result: "Consolidación del sistema e informe de resultados a 90 días.",
    },
  ],
} as const;

export const euro = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
    // es-ES no agrupa números de 4 cifras por defecto ("2400 €").
    useGrouping: "always",
  }).format(value);
