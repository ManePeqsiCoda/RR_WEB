import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { createTransporter, buildEmailHTML } from '@/lib/mailer'

/* Rate limiting básico en memoria (producción: usar Upstash) */
const requestLog = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minuto
const RATE_LIMIT_MAX = 3 // 3 envíos por minuto

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const times = requestLog.get(ip) ?? []
  const recent = times.filter((t) => now - t < RATE_LIMIT_WINDOW)
  requestLog.set(ip, [...recent, now])
  return recent.length >= RATE_LIMIT_MAX
}

export async function POST(req: NextRequest) {
  try {
    /* 1. Rate limiting */
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera un minuto.' },
        { status: 429 }
      )
    }

    /* 2. Parse del body */
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Formato de datos inválido.' },
        { status: 400 }
      )
    }

    /* 3. Validación con Zod */
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Datos inválidos.',
          details: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      )
    }

    const data = result.data

    /* 4. Envío del correo principal a RR Aliados */
    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"RR Aliados | Protocolo" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_RECIPIENT ?? process.env.SMTP_USER,
      replyTo: data.email,
      subject: `[RR Aliados] Nuevo contacto: ${data.fullName} — ${data.service}`,
      html: buildEmailHTML(data),
      text:
        `Nuevo contacto de ${data.fullName} (${data.company})\n` +
        `Email: ${data.email}\n` +
        `Presupuesto: ${data.budget}\n` +
        `Servicio: ${data.service}\n\n` +
        `Mensaje:\n${data.message}`,
    })

    /* 5. Email de confirmación al cliente */
    await transporter.sendMail({
      from: `"RR Aliados" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: '◆ Protocolo Iniciado — RR Aliados',
      html: `<div style="font-family:Arial;background:#0A0A0F;
                         color:#E8E6D8;padding:32px;max-width:520px">
               <h2 style="color:#CFAE3A;font-size:22px">
                 Protocolo Recibido, ${data.fullName.split(' ')[0]}.
               </h2>
               <p style="color:#9B9882;line-height:1.7">
                 Hemos recibido tu solicitud sobre
                 <strong style="color:#E8E6D8">${data.service}</strong>.
                 Nuestro equipo se contactará contigo en las próximas
                 <strong style="color:#CFAE3A">24 horas hábiles</strong>.
               </p>
               <p style="color:#5A584A;font-size:12px;margin-top:24px">
                 © 2026 RR ALIADOS · Sistemas Arquitectónicos Soberanos
               </p>
             </div>`,
    })

    return NextResponse.json(
      { success: true, message: 'Protocolo iniciado exitosamente.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /contact] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
