'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations'
import toast from 'react-hot-toast'

/**
 * NewsletterPopup — Automated entry modal for elite insights.
 * Design inspired by a dark, gold-accented premium UI.
 */
export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  useEffect(() => {
    // Check if user already subscribed
    const hasSubscribed = localStorage.getItem('rr_newsletter_subscribed')
    if (hasSubscribed) return

    // Check if user recently dismissed the modal (less than 7 days ago)
    const dismissedAt = localStorage.getItem('rr_newsletter_dismissed')
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) {
        return // Respetar la decisión del usuario por 7 días
      }
    }

    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const closePopup = () => {
    setIsOpen(false)
    // Cuando el usuario lo cierra explícitamente, guardamos la fecha
    localStorage.setItem('rr_newsletter_dismissed', Date.now().toString())
  }

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Error al registrar')

      setIsSuccess(true)
      localStorage.setItem('rr_newsletter_subscribed', 'true')
      toast.success('Protocolo activado correctamente.')
      
      // Close after 2 seconds on success
      setTimeout(() => {
        closePopup()
      }, 2000)
    } catch (err) {
      toast.error('Hubo un problema. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-[440px] bg-[#0D0D15] border border-white/10 rounded-[28px] p-10 shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 text-txt-faint hover:text-txt-primary transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon Banner */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-[18px] flex items-center justify-center text-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h3 className="font-syne font-bold text-[28px] text-txt-primary mb-3 leading-tight">
                Únete al Protocolo
              </h3>
              <p className="text-txt-secondary text-[15px] leading-relaxed">
                Recibe insights exclusivos sobre arquitecturas digitales soberanas y escalabilidad.
              </p>
            </div>

            {/* Form */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4 text-success font-mono text-sm uppercase tracking-widest"
              >
                ✓ Protocolo Activado
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full bg-[#141420] border border-white/8 rounded-xl px-5 py-4 text-txt-primary placeholder:text-txt-faint focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-mono"
                  />
                  {errors.email && (
                    <p className="text-error text-[10px] uppercase font-mono mt-2 ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-bg-primary font-syne font-bold text-xs tracking-[0.1em] uppercase py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'PROCESANDO...' : 'ACTIVAR PROTOCOLO'}
                </button>
              </form>
            )}

            {/* Footer */}
            <p className="text-center text-[10px] text-txt-faint uppercase font-mono mt-8 tracking-widest">
              Sin spam. Solo valor estratégico.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
