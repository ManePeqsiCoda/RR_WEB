'use client'

import { useState, type FormEvent } from 'react'

/**
 * NewsletterSection — Sección de suscripción al Protocolo.
 * Conectar a /api/newsletter en Fase 4. Por ahora console.log.
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    // TODO Fase 4: conectar a /api/newsletter con Resend o MailChimp
    console.log('[Newsletter] Nuevo suscriptor:', email)

    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="newsletter" className="py-20 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6 text-center">

          {/* Ícono */}
          <span
            className="text-accent text-4xl leading-none"
            aria-hidden="true"
          >
            ✉
          </span>

          {/* Headline */}
          <h2
            className="font-syne font-bold"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
          >
            Únete al{' '}
            <em className="text-accent not-italic">Protocolo</em>
          </h2>

          {/* Subtítulo */}
          <p className="text-txt-secondary text-[15px] leading-relaxed">
            Recibe estrategias de crecimiento soberano directamente en
            tu inbox. Sin spam, solo inteligencia accionable.
          </p>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm"
            noValidate
          >
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              aria-label="Correo electrónico"
              className="
                form-input rounded-r-none flex-1
                border-r-0 focus:z-10
              "
            />
            <button
              type="submit"
              className="
                bg-accent text-bg-primary font-syne font-bold text-xs
                tracking-widest uppercase px-6 py-3
                rounded-l-none rounded-r-button
                hover:brightness-110 transition-all duration-200
                flex-shrink-0 border border-accent
                whitespace-nowrap
              "
            >
              Activar
            </button>
          </form>

          {/* Feedback de estado */}
          {status === 'success' && (
            <p className="font-mono text-[11px] text-success tracking-wider animate-fade-in-up">
              ✓ ACCESO ACTIVADO — BIENVENIDO AL PROTOCOLO
            </p>
          )}
          {status === 'error' && (
            <p className="font-mono text-[11px] text-error tracking-wider animate-fade-in-up">
              ✗ ERROR — INTENTA NUEVAMENTE
            </p>
          )}

          {/* Nota privacidad */}
          <p className="font-mono text-[10px] text-txt-faint tracking-wider uppercase">
            © Sin spam · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  )
}
