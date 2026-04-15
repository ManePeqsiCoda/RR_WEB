import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/wompi/integrity
 * Genera la firma de integridad requerida por Wompi.
 * Fórmula: SHA256(reference + amountInCents + currency + integritySecret)
 */
export async function POST(req: NextRequest) {
  try {
    const { reference, amountInCents, currency } = await req.json()

    if (!reference || !amountInCents || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields: reference, amountInCents, currency' },
        { status: 400 }
      )
    }

    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET!

    // Concatenar en orden: referencia + monto + moneda + secreto
    const chain = `${reference}${amountInCents}${currency}${integritySecret}`

    const signature = crypto
      .createHash('sha256')
      .update(chain)
      .digest('hex')

    return NextResponse.json({ signature })
  } catch (error) {
    console.error('Wompi integrity error:', error)
    return NextResponse.json(
      { error: 'Failed to generate integrity signature' },
      { status: 500 }
    )
  }
}
