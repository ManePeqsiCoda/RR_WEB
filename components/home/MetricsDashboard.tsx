'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useInView'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

/** Metric card data */
interface MetricItem {
  icon: string
  iconColor: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  change: string
}

/** Bar chart data point */
interface BarPoint {
  month: string
  pct: number
  highlight: boolean
}

const metrics: MetricItem[] = [
  {
    icon: '★',
    iconColor: 'text-accent',
    value: 2847,
    label: 'LEADS TOTALES',
    change: '▲ 24.8%',
  },
  {
    icon: '●',
    iconColor: 'text-electric',
    value: 98.2,
    suffix: '%',
    decimals: 1,
    label: 'UPTIME DEL SISTEMA',
    change: '▲ Estable',
  },
  {
    icon: '◈',
    iconColor: 'text-success',
    value: 1.2,
    suffix: 's',
    decimals: 1,
    label: 'TIEMPO DE RESPUESTA',
    change: '▲ Óptimo',
  },
  {
    icon: '◆',
    iconColor: 'text-accent',
    value: 47.2,
    prefix: '$',
    suffix: 'M',
    decimals: 1,
    label: 'INGRESOS GESTIONADOS',
    change: '▲ 18.3%',
  },
]

const barData: BarPoint[] = [
  { month: 'Ene', pct: 35, highlight: false },
  { month: 'Feb', pct: 50, highlight: false },
  { month: 'Mar', pct: 45, highlight: false },
  { month: 'Abr', pct: 65, highlight: false },
  { month: 'May', pct: 80, highlight: true },
  { month: 'Jun', pct: 100, highlight: true },
]

/**
 * MetricsDashboard — Panel estratégico con 4 métrica cards
 * y gráfica de barras animada con Framer Motion.
 */
export default function MetricsDashboard() {
  const { ref: chartRef, isInView } = useScrollAnimation(0.3)

  return (
    <section id="metricas" className="py-20 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            ◆ MÉTRICAS EN TIEMPO REAL
          </p>
          <h2
            className="font-outfit font-bold"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
          >
            Panel{' '}
            <em className="text-accent not-italic">Estratégico</em>
          </h2>
        </div>

        {/* ── 4 Metric Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-bg-card border border-white/5 rounded-card p-5 flex flex-col gap-1"
            >
              <span className={`${m.iconColor} text-base mb-1`} aria-hidden="true">
                {m.icon}
              </span>
              <span className="font-outfit font-bold text-2xl text-txt-primary">
                <AnimatedCounter
                  target={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-txt-faint">
                {m.label}
              </span>
              <span className="text-success text-xs font-mono mt-1">
                {m.change}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bar Chart ── */}
        <div className="bg-bg-card border-gold rounded-card p-6">

          {/* Chart header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="font-outfit font-semibold text-txt-primary text-sm">
                Leads Generados Totales
              </h3>
              <p className="font-mono text-[10px] text-txt-faint mt-0.5">
                24.8% este mes
              </p>
            </div>
            <span className="badge self-start sm:self-auto">
              ◆ PORTFOLIO-WIDE
            </span>
          </div>

          {/* Barras */}
          <div ref={chartRef} className="flex items-end gap-3 h-32">
            {barData.map((bar, index) => (
              <div
                key={bar.month}
                className="flex flex-col items-center gap-2 flex-1"
              >
                {/* Barra */}
                <div className="w-full relative flex items-end" style={{ height: '96px' }}>
                  <motion.div
                    className={`
                      w-full rounded-sm
                      ${bar.highlight ? 'bg-accent' : 'bg-electric/40'}
                    `}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${bar.pct}%` } : { height: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                </div>
                {/* Label mes */}
                <span className="font-mono text-[9px] text-txt-faint uppercase">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-accent" />
              <span className="font-mono text-[9px] text-txt-faint uppercase">
                Mes actual
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-electric/40" />
              <span className="font-mono text-[9px] text-txt-faint uppercase">
                Meses anteriores
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

