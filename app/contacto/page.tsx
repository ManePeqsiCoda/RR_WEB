import type { Metadata } from 'next'
import ContactForm from '@/components/contacto/ContactForm'

export const metadata: Metadata = {
  title: 'Inicia tu Protocolo',
  description: 'Cuéntanos sobre tu proyecto y te ayudamos a construir tu ecosistema digital soberano.',
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Hablemos | RR Aliados',
    description: 'Comienza tu escalabilidad estratégica hoy mismo.',
    url: 'https://rraliados.com/contacto',
  },
}

export default function ContactoPage() {
  return (
    <section className="bg-bg-primary min-h-screen pt-32 pb-24 px-6 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-24 max-w-7xl mx-auto">
      
      {/* ── COLUMNA IZQUIERDA (5/12) ── */}
      <div className="w-full lg:w-5/12 flex flex-col gap-8">
        
        {/* Header */}
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-4 block">
            ◆ HABLEMOS
          </span>
          <h1
            className="font-syne font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            Inicia tu <span className="text-gradient-gold">Protocolo</span>
          </h1>
          <p className="text-txt-secondary text-lg leading-relaxed max-w-md">
            Cuéntanos sobre tu proyecto. Analizaremos tu ecosistema actual y diseñaremos una arquitectura a tu medida.
          </p>
        </div>

        {/* Features / Trust markers */}
        <ul className="flex flex-col gap-4 border-y border-white/5 py-8">
          {[
            'Respuesta en menos de 24h',
            'Diagnóstico inicial gratuito',
            'Sin compromisos hasta firmar',
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-accent text-[12px]" aria-hidden="true">✦</span>
              <span className="text-txt-secondary text-sm">{item}</span>
            </li>
          ))}
        </ul>

        {/* Tarjeta Contacto Directo */}
        <div className="bg-bg-card border-gold rounded-card p-6 flex flex-col gap-4 relative overflow-hidden mt-2">
          {/* Glow bg */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="font-syne font-semibold text-txt-primary flex items-center gap-2">
            <span className="text-accent">◆</span> Contacto Directo
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:rraliadosteam@gmail.com"
              className="font-mono text-accent text-sm hover:underline hover:underline-offset-4 w-fit"
            >
              rraliadosteam@gmail.com
            </a>
            {/* Si quisieran añadir el whatsapp */}
            <span className="font-mono text-xs text-txt-faint flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-success flex-shrink-0 animate-pulse" />
              Soporte Asíncrono Disponible
            </span>
          </div>
        </div>

      </div>

      {/* ── COLUMNA DERECHA (7/12) - Formulario ── */}
      <div className="w-full lg:w-7/12 max-w-2xl">
        <ContactForm />
      </div>

    </section>
  )
}
