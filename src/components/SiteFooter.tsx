import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo variant="white" width={180} />
          <p className="max-w-sm text-sm">{site.tagline}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-display text-base font-semibold text-white">Contacto</h2>
          <p>
            <a href={`mailto:${site.email}`} className="link-underline hover:text-white">
              {site.email}
            </a>
          </p>
          <p>
            <Link href="/mapa-gratuito" className="link-underline hover:text-white">
              Pedir el Mapa de Producción Perdida
            </Link>
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-display text-base font-semibold text-white">Legal</h2>
          <p>
            <Link href="/aviso-legal" className="link-underline hover:text-white">
              Aviso legal
            </Link>
          </p>
          <p>
            <Link href="/privacidad" className="link-underline hover:text-white">
              Política de privacidad
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-xs text-white/60">
          © {new Date().getFullYear()} {site.name}. Automatización de agendas para clínicas dentales.
        </p>
      </div>
    </footer>
  );
}
