/**
 * types/index.ts
 * Interfaces TypeScript globales para el proyecto RR Aliados.
 */

/* ─────────────────────────────────────────────────────── */
/* SERVICIOS                                              */
/* ─────────────────────────────────────────────────────── */

/**
 * Representa un servicio ofrecido por RR Aliados.
 * Utilizado en ServiciosGrid y ServiceDetailCard.
 */
export interface Service {
  /** Identificador único del servicio */
  id: string
  /** Nombre del ícono SVG a renderizar (ej: "brain", "chart", "shield") */
  icon: string
  /** Título visible del servicio */
  title: string
  /** Descripción corta para la tarjeta de resumen */
  description: string
  /** Lista de características o beneficios clave */
  features: string[]
  /** Ruta interna o ancla del servicio */
  href: string
}

/* ─────────────────────────────────────────────────────── */
/* PRICING                                                */
/* ─────────────────────────────────────────────────────── */

/**
 * Plan de pricing para la sección de Paquetes.
 * Utilizado en PricingSection y PricingCard.
 */
export interface PricingPlan {
  /** Identificador único del plan */
  id: string
  /** Nombre del plan (ej: "Núcleo", "Arquitecto", "Soberano") */
  name: string
  /** Precio formateado para mostrar (ej: "$1.2M COP / mes") */
  price: string
  /** Descripción del plan y su propuesta de valor */
  description: string
  /** Lista de características incluidas en el plan */
  features: string[]
  /** Texto del botón CTA del plan */
  cta: string
  /** Si es true, el plan se destaca visualmente como recomendado */
  featured?: boolean
}

/* ─────────────────────────────────────────────────────── */
/* FORMULARIO DE CONTACTO                                 */
/* ─────────────────────────────────────────────────────── */

/**
 * Datos del formulario de contacto B2B.
 * Validados con Zod y manejados con react-hook-form.
 */
export interface ContactFormData {
  /** Nombre completo del prospecto */
  fullName: string
  /** Correo electrónico corporativo */
  email: string
  /** Nombre de la empresa */
  company: string
  /** Rango de presupuesto mensual */
  budget: string
  /** Servicio de interés principal */
  service: string
  /** Mensaje detallado del requerimiento */
  message: string
}

/* ─────────────────────────────────────────────────────── */
/* MÉTRICAS                                               */
/* ─────────────────────────────────────────────────────── */

/**
 * Métrica individual para el panel estratégico (MetricsDashboard).
 */
export interface Metric {
  /** Identificador único */
  id: string
  /** Valor de la métrica formateado (ej: "2,847", "$47.2M") */
  value: string
  /** Etiqueta descriptiva */
  label: string
  /** Subtexto o unidad */
  sublabel?: string
  /** Variación porcentual respecto al período anterior */
  change?: string
  /** Tipo de variación para colorear */
  trend?: 'up' | 'down' | 'neutral'
}

/* ─────────────────────────────────────────────────────── */
/* NEWSLETTER                                             */
/* ─────────────────────────────────────────────────────── */

/**
 * Datos del formulario de suscripción al newsletter.
 */
export interface NewsletterFormData {
  email: string
}

/* ─────────────────────────────────────────────────────── */
/* API RESPONSE                                           */
/* ─────────────────────────────────────────────────────── */

/**
 * Respuesta estándar de las API Routes del proyecto.
 */
export interface ApiResponse<T = null> {
  success: boolean
  message: string
  data?: T
}
