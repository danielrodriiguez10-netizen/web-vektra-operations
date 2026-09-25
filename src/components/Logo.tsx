import Image from "next/image";

// Logo oficial extraído de "vektra logo versiones.pdf" (páginas 1 y 2), con fondo transparente.
const files = {
  color: "/brand/vektra-logo.png",
  white: "/brand/vektra-logo-blanco.png",
} as const;

// Proporciones de los PNG (1602x912).
const RATIO = 912 / 1602;
// Manual de marca: nunca por debajo de 150px de ancho en web.
const MIN_WIDTH = 150;

export function Logo({
  variant = "color",
  width = MIN_WIDTH,
  eager = false,
}: {
  variant?: keyof typeof files;
  width?: number;
  eager?: boolean;
}) {
  const w = Math.max(width, MIN_WIDTH);
  const h = Math.round(w * RATIO);
  return (
    <Image
      src={files[variant]}
      alt="Vektra Operations"
      width={w}
      height={h}
      loading={eager ? "eager" : "lazy"}
      // Tamaño fijo: evita que el "height: auto" global lo redondee distinto del atributo.
      style={{ width: w, height: h }}
    />
  );
}
