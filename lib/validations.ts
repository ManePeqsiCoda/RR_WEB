import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),

  email: z
    .string()
    .email('Correo electrónico inválido')
    .max(200),

  company: z
    .string()
    .min(2, 'Nombre de empresa requerido')
    .max(150),

  budget: z.enum([
    'Menos de $1M',
    '$1M – $3.5M',
    '$3.5M – $5M',
    'Más de $5M',
    'Por definir'
  ], { errorMap: () => ({ message: 'Selecciona un rango' }) }),

  service: z.enum([
    'Creación de Contenido',
    'Desarrollo Web',
    'Manejo de Redes',
    'Pauta Publicitaria',
    'Respuesta de Mensajes',
    'Integración CRM',
    'Paquete Social Media Pro',
    'Paquete Ecosistema Digital',
    'Paquete Soberanía Total'
  ], { errorMap: () => ({ message: 'Selecciona un servicio' }) }),

  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(2000, 'Mensaje demasiado largo')
    .transform(val => val.trim()),
})

export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .max(200),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
