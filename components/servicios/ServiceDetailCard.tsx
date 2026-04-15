'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, slideInLeft } from '@/lib/animations'
import { useScrollAnimation } from '@/hooks/useInView'

export interface ServiceDetailCardProps {
  id: string
  icon: string
  title: string
  description: string
  benefits: string[]
  process: string[]
  reversed?: boolean
}

/**
 * ServiceDetailCard — Componente alternado de texto y visual decorativo con animaciones.
 */
export default function ServiceDetailCard({
  id,
  icon,
  title,
  description,
  benefits,
  process,
  reversed = false,
}: ServiceDetailCardProps) {
  const { ref, isInView } = useScrollAnimation(0.15)

  return (
    <motion.article
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`
        max-w-7xl mx-auto px-6 py-20 flex flex-col gap-12 items-center
        ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}
      `}
    >
      {/* ── COLUMNA TEXTUAL (7/12) ── */}
      <motion.div
        variants={slideInLeft}
        className="w-full lg:w-7/12 flex flex-col gap-8"
      >

        {/* Header (Número + Título) */}
        <div>
          <span className="font-mono text-[10px] text-txt-faint uppercase tracking-widest mb-3 block">
            {id}
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl leading-tight">
            {title}
          </h2>
          <p className="text-txt-secondary text-base leading-relaxed mt-4 max-w-xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Beneficios Clave */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            <h3 className="font-mono text-[11px] text-txt-primary uppercase tracking-widest border-b border-white/5 pb-2">
              BENEFICIOS CLAVE
            </h3>
            <ul className="flex flex-col">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-accent text-[12px] mt-1" aria-hidden="true">
                    ✦
                  </span>
                  <span className="text-txt-secondary text-sm leading-snug">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Proceso */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            <h3 className="font-mono text-[11px] text-txt-primary uppercase tracking-widest border-b border-white/5 pb-2">
              PROCESO
            </h3>
            <ul className="flex flex-col gap-4 mt-1">
              {process.map((step, index) => (
                <motion.li
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 flex-shrink-0 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[10px] font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-txt-secondary text-sm leading-snug">
                    {step}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Link */}
        <div className="mt-4">
          <Link
            href="/contacto"
            className="text-accent font-mono text-xs tracking-wider underline-offset-4 hover:underline flex items-center gap-2 w-fit transition-all duration-200"
          >
            COMENZAR CON ESTE SERVICIO <span aria-hidden="true">→</span>
          </Link>
        </div>
      </motion.div>

      {/* ── COLUMNA VISUAL DECORATIVA (5/12) ── */}
      <motion.div
        variants={fadeInUp}
        className="w-full lg:w-5/12"
      >
        <div className="bg-bg-card border-gold rounded-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">

          {/* Glow de fondo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(207,174,58,0.1) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.span
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl text-accent drop-shadow-[0_0_15px_rgba(207,174,58,0.3)] inline-block"
              aria-hidden="true"
            >
              {icon}
            </motion.span>
            <h4 className="font-syne font-semibold text-txt-primary text-xl max-w-[200px]">
              {title}
            </h4>

            {/* Mini métricas ficticias para decorar */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-6 w-full max-w-[240px]">
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-accent text-sm">98%</span>
                <span className="font-mono text-[9px] text-txt-faint uppercase text-center">
                  Eficacia
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-accent text-sm">24h</span>
                <span className="font-mono text-[9px] text-txt-faint uppercase text-center">
                  Operación
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

