'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { fadeInUp } from '@/lib/animations'

const BUDGET_OPTIONS = [
  'Menos de $1M',
  '$1M – $3.5M',
  '$3.5M – $5M',
  'Más de $5M',
  'Por definir',
]

const SERVICE_OPTIONS = [
  'Creación de Contenido',
  'Desarrollo Web',
  'Manejo de Redes',
  'Pauta Publicitaria',
  'Respuesta de Mensajes',
  'Integración CRM',
  'Paquete Social Media Pro',
  'Paquete Ecosistema Digital',
  'Paquete Soberanía Total',
]

/**
 * ContactForm — Formulario B2B premium con animaciones y éxito.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      
      if (!res.ok) throw new Error(json.error || 'Error desconocido')
        
      setStatus('success')
      toast.success('¡Protocolo iniciado! Te contactaremos pronto.')
      reset()
    } catch (err) {
      setStatus('error')
      toast.error(
        err instanceof Error ? err.message : 'Error al enviar. Intenta de nuevo.'
      )
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial="visible"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-bg-card border-gold rounded-card p-8 flex flex-col gap-6"
            noValidate
          >
            {/* 1. Nombre y 2. Email (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} custom={0} initial="hidden" animate="visible">
                <label htmlFor="fullName" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                  NOMBRE COMPLETO
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full placeholder:text-txt-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="text-error text-xs font-mono mt-1.5">{errors.fullName.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} custom={1} initial="hidden" animate="visible">
                <label htmlFor="email" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@empresa.com"
                  className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full placeholder:text-txt-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-error text-xs font-mono mt-1.5">{errors.email.message}</p>
                )}
              </motion.div>
            </div>

            {/* 3. Empresa */}
            <motion.div variants={fadeInUp} custom={2} initial="hidden" animate="visible">
              <label htmlFor="company" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                EMPRESA
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Corp"
                className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full placeholder:text-txt-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200"
                {...register('company')}
              />
              {errors.company && (
                <p className="text-error text-xs font-mono mt-1.5">{errors.company.message}</p>
              )}
            </motion.div>

            {/* 4. Presupuesto y 5. Servicio (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} custom={3} initial="hidden" animate="visible">
                <label htmlFor="budget" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                  PRESUPUESTO ESTIMADO
                </label>
                <select
                  id="budget"
                  className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 appearance-none"
                  {...register('budget')}
                >
                  <option value="" disabled hidden>
                    Seleccione un rango
                  </option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-error text-xs font-mono mt-1.5">{errors.budget.message}</p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp} custom={4} initial="hidden" animate="visible">
                <label htmlFor="service" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                  SERVICIO DE INTERÉS
                </label>
                <select
                  id="service"
                  className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 appearance-none"
                  {...register('service')}
                >
                  <option value="" disabled hidden>
                    Seleccione un servicio
                  </option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-error text-xs font-mono mt-1.5">{errors.service.message}</p>
                )}
              </motion.div>
            </div>

            {/* 6. Mensaje */}
            <motion.div variants={fadeInUp} custom={5} initial="hidden" animate="visible">
              <label htmlFor="message" className="font-mono text-[10px] tracking-[0.15em] uppercase text-txt-faint mb-2 block">
                MENSAJE
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Cuéntanos brevemente sobre los objetivos de este proyecto..."
                className="bg-bg-tertiary border border-white/8 rounded-input text-txt-primary font-mono text-sm px-4 py-3.5 w-full placeholder:text-txt-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200 resize-y"
                {...register('message')}
              />
              {errors.message && (
                <p className="text-error text-xs font-mono mt-1.5">{errors.message.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={fadeInUp}
              custom={6}
              initial="hidden"
              animate="visible"
              type="submit"
              disabled={status === 'loading'}
              className={`
                flex items-center justify-center py-4 rounded-button font-bold text-xs tracking-widest uppercase transition-all duration-200
                ${
                  status === 'idle'
                    ? 'bg-accent text-bg-primary hover:brightness-110 w-full'
                    : status === 'loading'
                    ? 'bg-accent/70 text-bg-primary cursor-not-allowed w-full'
                    : 'bg-error/20 text-error border border-error/30 w-full'
                }
              `}
            >
              {status === 'idle' && 'ENVIAR MENSAJE →'}
              {status === 'loading' && (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-bg-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ENVIANDO...
                </div>
              )}
              {status === 'error' && '✗ ERROR — REINTENTAR'}
            </motion.button>
          </motion.form>

        ) : (
          <motion.div
            key="success-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center py-20 bg-bg-card border-gold rounded-card"
          >
            <div className="text-6xl text-success mb-6">✓</div>
            <h3 className="font-syne font-bold text-3xl mb-2 text-txt-primary">Protocolo Iniciado</h3>
            <p className="text-txt-secondary max-w-sm mx-auto">
              Tu solicitud ha sido encriptada y enviada con éxito.
              Nos contactaremos en menos de 24 horas.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-accent font-mono text-[10px] tracking-widest uppercase hover:underline"
            >
              ENVIAR OTRO MENSAJE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

