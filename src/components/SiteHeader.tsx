import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/#preguntas", label: "Preguntas" },
];

export function SiteHeader() {
  return (
    <header className="header-scroll sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-6 py-2.5">
        <Link href="/" aria-label="Vektra Operations, inicio" className="shrink-0">
          <Logo eager />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.95rem] font-medium text-ink">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline hover:text-navy">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/mapa-gratuito" className="btn-strong min-h-11 whitespace-nowrap px-4 py-2 text-sm sm:px-5">
          Diagnóstico gratis
        </Link>
      </div>
    </header>
  );
}
