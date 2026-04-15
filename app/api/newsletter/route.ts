import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema } from '@/lib/validations'
import { createTransporter } from '@/lib/mailer'

/**
 * API Route for Newsletter Subscription
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validation
    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 422 }
      )
    }

    const { email } = result.data
    const transporter = createTransporter()

    // 2. Internal Notification
    await transporter.sendMail({
      from: `"RR Aliados | Newsletter" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_RECIPIENT ?? process.env.SMTP_USER,
      subject: `[RR Aliados] Nueva suscripción: ${email}`,
      html: `
        <div style="font-family:Arial;background:#0A0A0F;color:#E8E6D8;padding:32px;max-width:520px">
          <h2 style="color:#CFAE3A;font-size:20px;border-bottom:1px solid #CFAE3A;padding-bottom:10px">
            Nueva Suscripción al Protocolo
          </h2>
          <p style="margin-top:20px">Se ha registrado un nuevo correo para insights exclusivos:</p>
          <div style="background:#111120;padding:15px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);margin-top:10px">
            <strong style="color:#CFAE3A">Email:</strong> ${email}
          </div>
          <p style="color:#5A584A;font-size:12px;margin-top:30px">© 2026 RR ALIADOS</p>
        </div>
      `,
    })

    // 3. User Confirmation
    await transporter.sendMail({
      from: `"RR Aliados" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '◆ Protocolo Activado — Bienvenid@',
      html: `
        <div style="font-family:Arial;background:#0A0A0F;color:#E8E6D8;padding:40px;max-width:520px;border:1px solid rgba(207,174,58,0.2)">
          <h2 style="color:#CFAE3A;font-size:24px;margin-bottom:20px">Bienvenid@ al Protocolo.</h2>
          <p style="color:#9B9882;line-height:1.7;font-size:15px">
            Has activado el acceso a insights exclusivos sobre arquitecturas digitales, soberanía de datos y escalabilidad estratégica.
          </p>
          <p style="color:#9B9882;line-height:1.7;font-size:15px;margin-top:15px">
            Pronto recibirás nuestra primera transmisión.
          </p>
          <div style="margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#5A584A;text-align:center">
            RR ALIADOS · Sistemas Arquitectónicos Soberanos<br/>
            Este es un correo automático, no es necesario responder.
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[API /newsletter] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
