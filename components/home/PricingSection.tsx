'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

/** Pricing plan data structure */
interface Plan {
  name: string
  price: string
  desc: string
  features: string[]
  featured: boolean
}

const plans: Plan[] = [
  {
    name: 'Social Media Pro',
    price: 'Desde $1.2M',
    desc: 'Ideal para marcas que buscan presencia y autoridad en redes sociales.',
    features: [
      'Creación de contenido',
      'Edición de video / reels',
      'Publicación programada',
      'Manejo de comunidad',
    ],
    featured: false,
  },
  {
    name: 'Ecosistema Digital',
    price: 'Desde $3.5M',
    desc: 'Desarrollo web robusto con herramientas de gestión interna.',
    features: [
      'Página Web Profesional',
      'CRM Personalizado',
      'Optimización SEO',
      'Capacitación de uso',
    ],
    featured: true,
  },
  {
    name: 'Soberanía Total',
    price: 'Desde $5.0M',
    desc: 'La solución definitiva: presencia, gestión y ventas automatizadas.',
    features: [
      'Todo lo de Social Media',
      'Todo lo de Ecosistema Digital',
      'Pauta Publicitaria Ads',
      'Respuesta de Mensajes 24/7',
    ],
    featured: false,
  },
]

/**
 * PricingCard — Individual card component to encapsulate tilt logic.
 */
function PricingCard({ plan }: { plan: Plan }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotateX(-y * 6)
    setRotateY(x * 6)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        rounded-card p-8 flex flex-col gap-5
        transition-colors duration-300
        ${
          plan.featured
            ? 'border-2 border-accent bg-gradient-to-br from-bg-tertiary to-bg-card lg:scale-105 z-10 shadow-[0_0_40px_rgba(207,174,58,0.12)]'
            : 'border border-white/[0.06] bg-bg-card hover:border-accent/20'
        }
      `}
    >
      {/* Badge popular */}
      {plan.featured && (
        <div style={{ transform: 'translateZ(20px)' }}>
          <span className="bg-accent text-bg-primary font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full inline-block text-shadow-none">
            MÁS POPULAR
          </span>
        </div>
      )}

      {/* Nombre */}
      <h3
        className="font-outfit font-bold text-txt-primary text-2xl tracking-[-0.01em]"
        style={{ transform: 'translateZ(25px)' }}
      >
        {plan.name}
      </h3>

      {/* Precio */}
      <div style={{ transform: 'translateZ(30px)' }}>
        <span
          className={`font-outfit font-extrabold text-3xl ${
            plan.featured ? 'text-accent' : 'text-txt-primary'
          }`}
        >
          {plan.price}
        </span>
        <span className="font-mono text-[10px] text-txt-faint ml-2 uppercase tracking-wider">
          COP / mes
        </span>
      </div>

      {/* Descripción */}
      <p
        className="text-txt-secondary text-sm leading-relaxed"
        style={{ transform: 'translateZ(15px)' }}
      >
        {plan.desc}
      </p>

      {/* Features */}
      <ul className="flex flex-col" style={{ transform: 'translateZ(10px)' }}>
        {plan.features.map((feat) => (
          <li
            key={feat}
            className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0"
          >
            <span className="text-success text-sm flex-shrink-0">✓</span>
            <span className="text-txt-secondary text-sm">{feat}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contacto"
        className={`
          mt-2 w-full text-center font-outfit font-bold text-xs
          tracking-widest uppercase px-6 py-3.5 rounded-button
          transition-all duration-200 inline-block
          ${
            plan.featured
              ? 'bg-accent text-bg-primary hover:brightness-110'
              : 'border border-white/15 text-txt-secondary hover:border-accent/30 hover:text-txt-primary'
          }
        `}
        style={{ transform: 'translateZ(35px)' }}
      >
        SELECCIONAR PLAN →
      </Link>
    </motion.article>
  )
}

/**
 * PricingSection — 3 tarjetas de pricing con card central destacada.
 * Incluye efectos 3D y Framer Motion.
 */
export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-bg-secondary"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            ◆ PAQUETES INTEGRALES
          </p>
          <h2 className="font-outfit font-semibold tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
            Paquetes{' '}
            <em className="text-accent not-italic">Integrales</em>
          </h2>
          <p className="text-txt-secondary text-[15px] leading-relaxed">
            Elige el nivel de soberanía que tu empresa necesita. Todos los
            planes incluyen soporte directo con el equipo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

