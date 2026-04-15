import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

/**
 * TrayectoriaSection — Historia, valores y métricas de RR Aliados.
 * Layout 5/12 texto + 7/12 card decorativa de dashboard preview.
 */
export default function TrayectoriaSection() {
  const metrics = [
    { value: 50, prefix: '+', label: 'Clientes Activos' },
    { value: 98, suffix: '%', label: 'Satisfacción' },
    { value: 3, suffix: 'x', label: 'ROI Promedio' },
  ]

  return (
    <section
      id="trayectoria"
      className="py-20 px-6 bg-bg-secondary"
    >
      <div className="max-w-7xl mx-auto">

        {/* Label superior */}
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-12">
          ◆ NUESTRA TRAYECTORIA
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── COL IZQUIERDA (5/12) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Headline */}
            <h2 className="font-syne font-bold text-4xl leading-tight">
              Forjando el
              <br />
              Futuro de la
              <br />
              <span className="text-accent">Soberanía Digital</span>
            </h2>

            {/* Descripción */}
            <div className="flex flex-col gap-4">
              <p className="text-txt-secondary text-[15px] leading-relaxed">
                Fundada en 2026, RR Aliados nació de la necesidad de devolver
                el control de los sistemas estratégicos a sus arquitectos
                originales. Entendemos que cada empresa merece una
                infraestructura digital diseñada a su medida, no una solución
                genérica de mercado masivo.
              </p>
              <p className="text-txt-secondary text-[15px] leading-relaxed">
                Nuestro enfoque integra herramientas de inteligencia artificial
                de vanguardia con metodologías probadas en el mercado
                latinoamericano, construyendo ecosistemas que no solo
                funcionan hoy, sino que escalan hacia el futuro.
              </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-3 border-t border-white/[0.08] pt-6 mt-2">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col gap-1 ${i > 0 ? 'border-l border-white/[0.08] pl-4' : ''}`}
                >
                  <span className="font-syne font-extrabold text-3xl text-txt-primary">
                    <AnimatedCounter target={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-txt-faint">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── COL DERECHA (7/12) — Dashboard preview decorativo ── */}
          <div className="lg:col-span-7">
            <div className="bg-bg-card border-gold rounded-card p-6 flex flex-col gap-5">

              {/* Header del card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse-gold" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-txt-faint">
                    SISTEMA ACTIVO
                  </span>
                </div>
                <span className="font-mono text-[10px] text-txt-faint">
                  v2.0.1
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {['IA Agéntica', 'Seguridad Avanzada', 'CRM Integrado', 'Analytics'].map((b) => (
                  <span key={b} className="badge">
                    {b}
                  </span>
                ))}
              </div>

              {/* Barra de métricas simuladas */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
                {[
                  { label: 'Eficiencia', pct: 92 },
                  { label: 'Velocidad', pct: 87 },
                  { label: 'Retención', pct: 98 },
                  { label: 'Escalabilidad', pct: 95 },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-txt-faint">
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] text-accent">
                        {item.pct}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent/60 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Texto descriptivo */}
              <p className="text-txt-secondary text-sm leading-relaxed border-t border-white/5 pt-4">
                Arquitectura multi-capa diseñada para alta disponibilidad,
                recuperación instantánea y adaptación continua a las
                condiciones del mercado digital colombiano.
              </p>

              {/* Botón decorativo */}
              <button className="self-start border border-white/15 text-txt-secondary font-syne text-[11px] tracking-widest uppercase px-4 py-2 rounded-button hover:border-accent/30 hover:text-txt-primary transition-all duration-200">
                ARQUITECTURA ACTIVA →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
