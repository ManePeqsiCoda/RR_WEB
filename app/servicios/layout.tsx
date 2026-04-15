import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nuestros Servicios',
  description: 'Soluciones individuales y paquetes integrales diseñados para escalar tu presencia digital con soberanía total.',
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: 'Nuestros Servicios | RR Aliados',
    description: 'Soluciones individuales y paquetes integrales calibrados para escalar tu operación.',
    url: 'https://rraliados.com/servicios',
  },
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
