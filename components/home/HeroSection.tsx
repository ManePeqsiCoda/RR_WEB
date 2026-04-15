'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/animations'

/**
 * HeroSection — Sección principal de la landing.
 * Headline de tres líneas, badge protocolo, CTAs y glow radial.
 */
export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-20 px-6 bg-bg-primary overflow-hidden"
    >
      {/* ── GLOW RADIAL DE FONDO ── */}
      <motion.div
        aria-hidden="true"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] z-0"
        style={{
          background:
            'radial-gradient(ellipse, rgba(207,174,58,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── BADGE TOP-LEFT (desktop) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-32 left-8 z-10"
      >
        <span className="bg-bg-card border-gold rounded-lg px-3 py-2 font-mono text-xs text-txt-secondary flex items-center gap-1.5">
          <span className="text-accent">◆</span> Seguridad
        </span>
      </div>

      {/* ── BADGE TOP-RIGHT (desktop) ── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-32 right-8 z-10"
      >
        <span className="bg-bg-card border-gold rounded-lg px-3 py-2 font-mono text-xs text-txt-secondary flex items-center gap-1.5">
          <span className="text-accent">◆</span> Bien Estar
        </span>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">

          {/* Badge protocolo */}
          <motion.span
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-accent border border-accent/20 bg-accent/5 rounded-full px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            PROTOCOLO DE CRECIMIENTO SOBERANO V2.0
          </motion.span>

          {/* Headline */}
          <h1
            className="font-outfit font-bold tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: 'clamp(38px, 7vw, 82px)' }}
          >
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-txt-primary block"
            >
              Sistemas
            </motion.span>
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gradient-gold block"
            >
              Arquitectónicos
            </motion.span>
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-electric block"
            >
              Soberanos
            </motion.span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-txt-secondary text-lg leading-relaxed max-w-xl"
          >
            Ecosistema de vanguardia diseñado para el crecimiento estratégico de
            élite, fusionando inteligencia artificial agéntica con arquitecturas
            de datos soberanas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contacto"
                className="bg-accent text-bg-primary font-outfit font-bold text-xs tracking-widest uppercase px-7 py-3.5 rounded-button hover:brightness-110 transition-all duration-200 inline-flex items-center gap-2"
              >
                INICIAR PROTOCOLO <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
            <Link
              href="#trayectoria"
              className="border border-white/15 text-txt-secondary hover:text-txt-primary hover:border-white/30 font-outfit text-xs tracking-widest uppercase px-7 py-3.5 rounded-button transition-all duration-200"
            >
              QUIÉNES SOMOS
            </Link>
          </motion.div>

          {/* Mini stats row */}
          <div className="flex items-center gap-8 mt-6 pt-6 border-t border-white/5 w-full justify-center">
            {[
              { value: '2,847+', label: 'Leads generados' },
              { value: '98%', label: 'Satisfacción' },
              { value: '$47.2M', label: 'COP gestionados' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-outfit font-bold text-xl text-txt-primary">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-txt-faint mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

