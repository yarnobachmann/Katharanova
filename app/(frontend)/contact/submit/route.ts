import { NextResponse } from 'next/server'

import { contactRecipient, defaultFromAddress, defaultFromName, sendEmail } from '@/lib/email/smtp'

export const runtime = 'nodejs'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const name = clean(data.naam)
    const email = clean(data.email).toLowerCase()
    const phone = clean(data.telefoon)
    const treatment = clean(data.voorkeursbehandeling)
    const message = clean(data.bericht)
    const website = clean(data.website)

    if (website) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Vul je naam, e-mailadres en bericht in.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 })
    }

    await sendEmail({
      from: `"${defaultFromName}" <${defaultFromAddress}>`,
      replyTo: `"${name.replaceAll('"', '')}" <${email}>`,
      to: contactRecipient,
      subject: `Nieuw contactformulier bericht van ${name}`,
      text: [
        `Naam: ${name}`,
        `E-mailadres: ${email}`,
        phone ? `Telefoon: ${phone}` : null,
        treatment ? `Voorkeursbehandeling: ${treatment}` : null,
        '',
        message
      ].filter(Boolean).join('\n'),
      html: `
        <h2>Nieuw contactformulier bericht</h2>
        <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mailadres:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${phone ? `<p><strong>Telefoon:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${treatment ? `<p><strong>Voorkeursbehandeling:</strong> ${escapeHtml(treatment)}</p>` : ''}
        <hr />
        <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
      `
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form email failed', error)
    return NextResponse.json({ error: 'Versturen is niet gelukt. Probeer het later opnieuw.' }, { status: 500 })
  }
}
