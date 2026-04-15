import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import NewsletterPopup from '@/components/shared/NewsletterPopup'

/* ─────────────────────────────────────────────────────── */
/* FUENTES                                                */
/* ─────────────────────────────────────────────────────── */
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

/* ─────────────────────────────────────────────────────── */
/* METADATA GLOBAL                                        */
/* ─────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://rraliados.com'),
  title: {
    default: 'RR Aliados | Sistemas Arquitectónicos Soberanos',
    template: '%s | RR Aliados'
  },
  description: 'Arquitecturas digitales y estrategias de escalabilidad para marcas que exigen soberanía sobre sus datos e infraestructura.',
  keywords: [
    'agencia digital',
    'IA agéntica',
    'CRM',
    'pauta publicitaria',
    'soberanía digital',
    'Colombia',
    'automatización',
    'marketing B2B',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RR Aliados | Sistemas Arquitectónicos Soberanos',
    description: 'Arquitecturas digitales y estrategias de escalabilidad para marcas que exigen soberanía sobre sus datos e infraestructura.',
    url: 'https://rraliados.com',
    siteName: 'RR Aliados',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RR Aliados',
    description: 'Arquitecturas digitales y estrategias de escalabilidad de élite.',
    images: ['/og-image.png'],
  },
}

import { Toaster } from 'react-hot-toast'

/* ─────────────────────────────────────────────────────── */
/* ROOT LAYOUT                                            */
/* ─────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <NewsletterPopup />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#13131F',
              color: '#E8E6D8',
              border: '1px solid rgba(207,174,58,0.15)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
            },
            success: {
              iconTheme: { primary: '#4ADE80', secondary: '#13131F' }
            },
            error: {
              iconTheme: { primary: '#F87171', secondary: '#13131F' }
            },
          }}
        />
      </body>
    </html>
  )
}
