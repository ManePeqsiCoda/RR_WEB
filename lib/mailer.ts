import nodemailer from 'nodemailer'
import type { ContactFormData } from './validations'

/* Transporter — toma credenciales SOLO de .env.local */
export function createTransporter() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Variable de entorno faltante: ${key}`)
    }
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: { rejectUnauthorized: false },
  })
}

/* Sanitización básica contra injection */
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '') // HTML tags
    .replace(/[\r\n]{3,}/g, '\n\n') // excessive newlines
    .trim()
}

/* Email en formato HTML para el receptor */
export function buildEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif;
               background: #0A0A0F; color: #E8E6D8; margin: 0; }
        .container { max-width: 600px; margin: 0 auto;
                     padding: 32px 24px; }
        .header { border-bottom: 2px solid #CFAE3A;
                  padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 18px; font-weight: 800;
                letter-spacing: 0.15em; color: #CFAE3A; }
        .badge { display: inline-block; background: rgba(207,174,58,0.12);
                 border: 1px solid rgba(207,174,58,0.2);
                 color: #CFAE3A; font-size: 10px;
                 letter-spacing: 0.15em; text-transform: uppercase;
                 padding: 4px 12px; border-radius: 20px; margin-top: 8px; }
        .field { background: #111120; border: 1px solid rgba(255,255,255,0.06);
                 border-radius: 8px; padding: 14px 16px;
                 margin-bottom: 12px; }
        .field-label { font-size: 10px; letter-spacing: 0.12em;
                       text-transform: uppercase; color: #9B9882;
                       margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #E8E6D8; }
        .message-box { background: #111120;
                       border: 1px solid rgba(207,174,58,0.15);
                       border-radius: 8px; padding: 16px;
                       margin-top: 16px; }
        .footer { margin-top: 32px; padding-top: 16px;
                  border-top: 1px solid rgba(255,255,255,0.06);
                  font-size: 11px; color: #5A584A;
                  text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">RR ALIADOS</div>
          <div class="badge">◆ Nuevo Protocolo de Contacto</div>
        </div>

        <div class="field">
          <div class="field-label">Nombre Completo</div>
          <div class="field-value">${sanitize(data.fullName)}</div>
        </div>
        <div class="field">
          <div class="field-label">Correo Electrónico</div>
          <div class="field-value">${sanitize(data.email)}</div>
        </div>
        <div class="field">
          <div class="field-label">Empresa</div>
          <div class="field-value">${sanitize(data.company)}</div>
        </div>
        <div class="field">
          <div class="field-label">Presupuesto Estimado</div>
          <div class="field-value">${sanitize(data.budget)}</div>
        </div>
        <div class="field">
          <div class="field-label">Servicio de Interés</div>
          <div class="field-value">${sanitize(data.service)}</div>
        </div>

        <div class="message-box">
          <div class="field-label">Mensaje</div>
          <p style="color:#E8E6D8;line-height:1.7;margin-top:8px;
                    font-size:14px;white-space:pre-wrap;">
            ${sanitize(data.message)}
          </p>
        </div>

        <div class="footer">
          © 2026 RR ALIADOS · Sistemas Arquitectónicos Soberanos
        </div>
      </div>
    </body>
    </html>
  `
}
