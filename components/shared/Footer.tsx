import Link from 'next/link'

/** Quick link item for footer navigation */
interface FooterLink {
  label: string
  href: string
}

/** Technology pill badge */
interface TechBadge {
  label: string
}

const QUICK_LINKS: FooterLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Paquetes', href: '/#pricing' },
  { label: 'Portal Corporativo', href: 'https://rr-dash-web.vercel.app/' },
]

const TECH_BADGES: TechBadge[] = [
  { label: 'IA Agéntica' },
  { label: 'Seguridad' },
  { label: 'Red Global' },
  { label: 'CRM Elite' },
  { label: 'Automatización' },
]

/**
 * Footer — Pie de página con 3 columnas, links rápidos,
 * badges tecnológicos y línea de copyright.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-white/5">
      {/* Columnas principales */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ── COLUMNA 1: Marca ── */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="
                font-mono font-medium text-accent tracking-widest uppercase
                text-[14px] hover:text-accent-light transition-colors duration-200
                w-fit
              "
            >
              RR ALIADOS
            </Link>
            <p className="text-txt-primary font-syne font-semibold text-base leading-snug">
              Forjando el Futuro de la<br />Soberanía Digital
            </p>
            <p className="text-txt-secondary text-sm leading-relaxed max-w-xs">
              Ecosistema de élite que fusiona IA agéntica con
              arquitecturas estratégicas para empresas que
              operan en la cima.
            </p>
            {/* Indicador de estado */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-gold" />
              <span className="font-mono text-[11px] text-txt-faint tracking-wider uppercase">
                SISTEMAS OPERATIVOS
              </span>
            </div>
          </div>

          {/* ── COLUMNA 2: Links Rápidos ── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[11px] text-txt-faint tracking-widest uppercase">
              Navegación
            </h3>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      font-mono text-xs text-txt-faint
                      hover:text-accent transition-colors duration-200
                      tracking-wide
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COLUMNA 3: Ecosistema Tecnológico ── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[11px] text-txt-faint tracking-widest uppercase">
              Ecosistema Tecnológico
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="
                    bg-accent/10 text-accent border border-accent/20
                    rounded-full text-xs px-3 py-1 font-mono
                    tracking-wide
                  "
                >
                  {badge.label}
                </span>
              ))}
            </div>
            {/* Mini stats */}
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div>
                <p className="font-mono text-accent text-lg font-medium">2,847+</p>
                <p className="font-mono text-[10px] text-txt-faint tracking-wider uppercase">Leads Generados</p>
              </div>
              <div>
                <p className="font-mono text-accent text-lg font-medium">$47.2M</p>
                <p className="font-mono text-[10px] text-txt-faint tracking-wider uppercase">COP Gestionados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-txt-faint tracking-wider text-center sm:text-left">
            © {currentYear} RR ALIADOS. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="font-mono text-xs text-txt-faint tracking-wider">
            PROTOCOLO V2.0
          </p>
        </div>
      </div>
    </footer>
  )
}
