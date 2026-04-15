'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * ServiceHero — Hero principal de la página de Servicios con animaciones.
 */
export default function ServiceHero() {
  const badges = [
    '6 Pilares Estratégicos',
    'Metodología Probada',
    'Resultados Medibles',
  ]

  return (
    <section className="pt-32 pb-20 px-6 bg-bg-primary text-center flex flex-col items-center overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full flex flex-col items-center gap-6"
      >

        {/* Badge superior */}
        <motion.span
          variants={fadeInUp}
          custom={0}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent border border-accent/20 bg-accent/5 rounded-full px-4 py-1.5 flex items-center gap-2"
        >
          <span className="text-accent" aria-hidden="true">◆</span> PORTAFOLIO ESTRATÉGICO
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          custom={1}
          className="font-syne font-extrabold tracking-tight leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
        >
          <span className="text-txt-primary block">Nuestros</span>
          <span className="text-gradient-gold block">Servicios</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="text-txt-secondary text-lg leading-relaxed max-w-2xl mt-2"
        >
          Soluciones individuales y paquetes integrales diseñados para escalar
          tu presencia digital con soberanía.
        </motion.p>

        {/* Grid de 3 badges informativos */}
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
        >
          {badges.map((badge, i) => (
            <span
              key={badge}
              className="border border-gold bg-accent/5 rounded-full font-mono text-[10px] px-4 py-1.5 text-accent tracking-widest uppercase"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

