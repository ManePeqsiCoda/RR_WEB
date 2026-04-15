'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/hooks/useInView'
import ServiceHero from '@/components/servicios/ServiceHero'
import ServiceDetailCard from '@/components/servicios/ServiceDetailCard'
import PricingSection from '@/components/home/PricingSection'

const SERVICES_DATA = [
  {
    icon: '✦',
    title: 'Creación de Contenido',
    description:
      'Diseñamos piezas visuales impactantes y con propósito, asegurando que cada publicación fortalezca la autoridad de tu marca en el mercado y convierta a tu audiencia en una comunidad leal.',
    benefits: [
      'Consistencia visual',
      'Identidad de marca sólida',
      'Engagement orgánico creciente',
      'Contenido optimizado por plataforma',
    ],
    process: [
      'Briefing conceptual y de marca',
      'Producción y diseño semanal',
      'Revisión, feedback y ajustes',
      'Publicación estratégica programada',
    ],
  },
  {
    icon: '</>',
    title: 'Desarrollo Web',
    description:
      'Construimos infraestructuras web nativas: sitios ultrarrápidos, modernos y optimizados que actúan como la pieza central inamovible de tu soberanía digital.',
    benefits: [
      'Performance 90+ en Lighthouse',
      'SEO técnico optimizado desde cero',
      'Diseño responsive mobile-first',
      'CMS integrado opcional para gestión',
    ],
    process: [
      'Wireframing y arquitectura web',
      'Diseño UI/UX aprobado',
      'Desarrollo Frontend y Backend',
      'QA estricto y lanzamiento oficial',
    ],
  },
  {
    icon: '↓',
    title: 'Manejo de Redes',
    description:
      'Administración estratégica de tus plataformas sociales. Tomamos el control operacional para que mantengas una presencia activa, constante y profesional sin intervenir a diario.',
    benefits: [
      'Comunidad activa y comprometida',
      'Publicaciones en horario pico inteligente',
      'Gestión de comentarios 24/7',
      'Reporte mensual de métricas y crecimiento',
    ],
    process: [
      'Auditoría profunda de cuentas',
      'Creación de la Estrategia de contenido',
      'Desarrollo del Calendario editorial',
      'Publicación y monitoreo continuo',
    ],
  },
  {
    icon: '⚡',
    title: 'Pauta Publicitaria',
    description:
      'Inyección de tráfico quirúrgico mediante campañas pagas en ecosistemas Meta, Google y TikTok. Minimizamos el desperdicio de capital y maximizamos la conversión directa de tu embudo.',
    benefits: [
      'ROAS (Retorno de Inversión) optimizado desde la semana 1',
      'Segmentación avanzada B2B y B2C',
      'A/B testing continuo en creatividades',
      'Reportes de conversión y CPL semanales',
    ],
    process: [
      'Definición de KPIs y objetivos',
      'Creación de ángulos y anuncios',
      'Lanzamiento vigilado y recopilación de data',
      'Optimización matemática de presupuestos',
    ],
  },
  {
    icon: '◎',
    title: 'Respuesta de Mensajes',
    description:
      'Un protocolo de respuesta híbrido (IA + Humano) que garantiza que ningún prospecto se enfríe. Atención inmediata 24/7 asimilando tu tono institucional al 100%.',
    benefits: [
      'Tiempo de respuesta inferior a 2 minutos',
      'Plantillas personalizadas alineadas a la marca',
      'Escalamiento inmediato a humano ante casos complejos',
      'Reportes constantes de satisfacción y FAQs',
    ],
    process: [
      'Onboarding exhaustivo de tono y voz',
      'Configuración de flujos condicionales de IA',
      'Activación en ecosistemas Meta/WhatsApp',
      'Monitoreo continuo para mejora de modelos',
    ],
  },
  {
    icon: '⬡',
    title: 'Integración CRM',
    description:
      'El cerebro de tu operación. Centralizamos toda la actividad comercial, correos y pipelines en un solo lugar, permitiéndote tener visión de rayos X sobre cada cuenta y prospecto.',
    benefits: [
      'Pipeline de ventas 100% centralizado',
      'Automatizaciones de seguimiento (follow-ups)',
      'Visibilidad analítica total del ciclo de vida del cliente',
      'Integración fluida con tus herramientas existentes',
    ],
    process: [
      'Auditoría minuciosa de procesos actuales',
      'Configuración arquitectónica del CRM',
      'Migración segura y limpia de base de datos',
      'Capacitación técnica de todo el equipo de ventas',
    ],
  },
]

/**
 * ServiciosPage — Página principal de Servicios (Deep Dive) con animaciones.
 */
export default function ServiciosPage() {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <div className="bg-bg-primary min-h-screen">
      <ServiceHero />

      {/* Array de Servicios Alternados */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col"
      >
        {SERVICES_DATA.map((service, index) => (
          <div key={service.title} className="relative">
            {/* Línea divisoria superior excepto en el primero */}
            {index > 0 && <div className="border-t border-white/5" aria-hidden="true" />}
            
            <ServiceDetailCard
              id={`0${index + 1}`}
              icon={service.icon}
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              process={service.process}
              reversed={index % 2 !== 0}
            />
          </div>
        ))}
      </motion.div>

      <div className="border-t border-white/5" aria-hidden="true" />

      {/* Sección Pricing Embebida */}
      <section className="bg-bg-secondary pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-[-40px]">
          <h2 className="font-syne font-bold text-2xl text-txt-primary">
            ¿Listo para elegir tu plan?
          </h2>
        </div>
        <PricingSection />
      </section>

      <div className="border-t border-white/5" aria-hidden="true" />

      {/* CTA Final */}
      <section className="py-24 px-6 bg-bg-secondary text-center flex flex-col items-center">
        <div className="max-w-2xl flex flex-col items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            ◆ HABLEMOS
          </span>
          <h2
            className="font-syne font-bold"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            Inicia tu <em className="text-accent not-italic">Protocolo</em>
          </h2>
          <p className="text-txt-secondary text-[15px] leading-relaxed max-w-lg mb-4">
            Cuéntanos sobre tu proyecto y te ayudamos a construir tu ecosistema digital soberano desde la primera sesión.
          </p>
          <Link
            href="/contacto"
            className="bg-accent text-bg-primary font-syne font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-button hover:brightness-110 transition-all duration-200"
          >
            INICIAR PROTOCOLO <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
