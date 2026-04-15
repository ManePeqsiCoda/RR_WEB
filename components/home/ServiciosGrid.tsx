'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/hooks/useInView'

/** Service item structure */
interface ServiceItem {
  icon: string
  title: string
  desc: string
}

const services: ServiceItem[] = [
  {
    icon: '✦',
    title: 'Creación de Contenido',
    desc: 'Diseño visual impactante para redes sociales que convierte audiencias en clientes fieles.',
  },
  {
    icon: '</>',
    title: 'Desarrollo Web',
    desc: 'Sitios rápidos, modernos y optimizados que reflejan la autoridad de tu marca.',
  },
  {
    icon: '↓',
    title: 'Manejo de Redes',
    desc: 'Gestión estratégica de comunidad, publicaciones y crecimiento orgánico sostenible.',
  },
  {
    icon: '⚡',
    title: 'Pauta Publicitaria',
    desc: 'Campañas de tráfico y conversión con ROI medible en Meta, Google y TikTok Ads.',
  },
  {
    icon: '◎',
    title: 'Respuesta de Mensajes',
    desc: 'Atención al cliente inmediata 24/7 con IA que mantiene el tono de tu marca.',
  },
  {
    icon: '⬡',
    title: 'Integración CRM',
    desc: 'Gestión centralizada de tus clientes, pipelines y automatizaciones comerciales.',
  },
]

/**
 * ServiciosGrid — Grilla 3×2 de tarjetas de servicios con animaciones.
 */
export default function ServiciosGrid() {
  const { ref, isInView } = useScrollAnimation(0.2)

  return (
    <section
      id="servicios"
      className="py-20 px-6 bg-bg-primary"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            ◆ PROTOCOLO ESTRATÉGICO
          </p>
          <h2 className="font-outfit font-semibold tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
            Nuestros{' '}
            <em className="text-accent not-italic">Servicios</em>
          </h2>
          <p className="text-txt-secondary text-[15px] leading-relaxed">
            Soluciones individuales y paquetes integrales calibrados para escalar
            tu operación con precisión quirúrgica.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((svc, i) => (
            <motion.article
              key={svc.title}
              variants={fadeInUp}
              custom={i}
              className="
                bg-bg-card border border-white/5 rounded-card p-6
                hover:border-accent/25 hover:bg-bg-tertiary
                transition-all duration-300 cursor-pointer group
              "
            >
              <div
                className="text-accent text-xl mb-4 group-hover:scale-110 transition-transform duration-200"
                aria-hidden="true"
              >
                {svc.icon}
              </div>
              <h3 className="font-outfit font-medium text-xl tracking-[-0.01em] text-txt-primary mb-2">
                {svc.title}
              </h3>
              <p className="text-txt-secondary text-sm leading-relaxed">
                {svc.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

