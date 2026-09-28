import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import "./globals.css";

// Fuentes incluidas en el proyecto (src/fonts, licencia OFL): la compilación no depende de Google Fonts.
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const openSans = localFont({
  variable: "--font-open-sans",
  src: [{ path: "../fonts/open-sans-latin-wght-normal.woff2", weight: "300 800", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Menos sillas vacías en tu clínica dental | Vektra Operations",
    template: "%s | Vektra Operations",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.name,
    url: site.url,
    title: "Menos sillas vacías. Menos caos en recepción. Más producción protegida.",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} ${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
