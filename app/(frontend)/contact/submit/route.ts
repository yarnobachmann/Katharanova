import { NextResponse } from 'next/server'

import { contactRecipient, defaultFromAddress, defaultFromName, sendEmail } from '@/lib/email/smtp'

export const runtime = 'nodejs'

const contactReasons = new Set([
  'Weet ik nog niet',
  'Transheling',
  'Opstelling',
  'Innerlijke werk',
  'Workshop',
  'Kennismakingsgesprek'
])

const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMax = 5
const emailRateLimitMax = 3
const duplicateWindowMs = 30 * 60 * 1000
const minimumSubmitTimeMs = 2500
const maximumSubmitTimeMs = 2 * 60 * 60 * 1000
const rateLimits = new Map<string, { count: number; resetAt: number }>()
const duplicateSubmissions = new Map<string, number>()
let lastRateLimitCleanup = 0

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const limit = (value: string, max: number) => value.slice(0, max)
const safeHeader = (value: string) => value.replace(/[\r\n"]/g, ' ').trim()
const normalizeSpamKey = (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim()
const makeSubmissionRef = () => {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${timestamp}-${suffix}`
}

const isValidPhone = (value: string) => {
  if (!value) return true
  if (!/^\+?[0-9][0-9\s().-]{7,18}$/.test(value)) return false

  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

const getClientKey = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip') ||
  'unknown'

const isRateLimited = (key: string, max = rateLimitMax) => {
  const now = Date.now()
  cleanupRateLimits(now)

  const current = rateLimits.get(key)

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + rateLimitWindowMs })
    return false
  }

  current.count += 1
  return current.count > max
}

const cleanupRateLimits = (now: number) => {
  if (now - lastRateLimitCleanup < rateLimitWindowMs) return
  lastRateLimitCleanup = now

  rateLimits.forEach((current, key) => {
    if (current.resetAt <= now) rateLimits.delete(key)
  })
}

const isEmailRateLimited = (email: string) => {
  if (!email) return false
  return isRateLimited(`email:${email}`, emailRateLimitMax)
}

const cleanupDuplicateSubmissions = (now: number) => {
  duplicateSubmissions.forEach((createdAt, key) => {
    if (now - createdAt > duplicateWindowMs) duplicateSubmissions.delete(key)
  })
}

const isDuplicateSubmission = (email: string, message: string) => {
  const now = Date.now()
  cleanupDuplicateSubmissions(now)

  const key = `${email}:${normalizeSpamKey(message).slice(0, 500)}`
  if (duplicateSubmissions.has(key)) return true

  duplicateSubmissions.set(key, now)
  return false
}

const isSuspiciousMessage = (message: string) => {
  const linkCount = (message.match(/https?:\/\/|www\./gi) || []).length
  if (linkCount > 1) return true

  const normalized = normalizeSpamKey(message)
  const blockedPatterns = [
    /\bcasino\b/,
    /\bcrypto\b/,
    /\bforex\b/,
    /\bloan\b/,
    /\bseo\b/,
    /\bbacklink\b/,
    /\bviagra\b/,
    /\btelegram\b/,
    /\bwhatsapp marketing\b/
  ]

  return blockedPatterns.some((pattern) => pattern.test(normalized))
}

const hasValidSubmitTiming = (value: string) => {
  const startedAt = Number(value)
  if (!Number.isFinite(startedAt)) return false

  const elapsed = Date.now() - startedAt
  return elapsed >= minimumSubmitTimeMs && elapsed <= maximumSubmitTimeMs
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > 12000) {
      return NextResponse.json({ error: 'Je bericht is te groot. Maak het iets korter en probeer opnieuw.' }, { status: 413 })
    }

    if (isRateLimited(getClientKey(request))) {
      return NextResponse.json({ error: 'Je hebt te vaak geprobeerd te versturen. Wacht even en probeer het opnieuw.' }, { status: 429 })
    }

    const data = await request.json()
    const name = limit(clean(data.naam), 120)
    const email = limit(clean(data.email).toLowerCase(), 180)
    const phone = limit(clean(data.telefoon), 20)
    const contactReason = limit(clean(data.redenVoorContact || data.voorkeursbehandeling), 80)
    const message = limit(clean(data.bericht), 2000)
    const website = clean(data.website)
    const company = clean(data.company)
    const formStartedAt = clean(data.formStartedAt)

    if (website || company) {
      return NextResponse.json({ ok: true })
    }

    if (!hasValidSubmitTiming(formStartedAt)) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Vul je naam, e-mailadres en bericht in.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 })
    }

    if (isEmailRateLimited(email)) {
      return NextResponse.json({ error: 'Dit e-mailadres heeft te vaak geprobeerd te versturen. Wacht even en probeer het opnieuw.' }, { status: 429 })
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Vul een geldig telefoonnummer in of laat dit veld leeg.' }, { status: 400 })
    }

    if (contactReason && !contactReasons.has(contactReason)) {
      return NextResponse.json({ error: 'Kies een geldige reden voor contact.' }, { status: 400 })
    }

    if (isSuspiciousMessage(message) || isDuplicateSubmission(email, message)) {
      return NextResponse.json({ ok: true })
    }

    const escapedName = escapeHtml(name)
    const escapedEmail = escapeHtml(email)
    const escapedPhone = escapeHtml(phone)
    const escapedContactReason = escapeHtml(contactReason)
    const escapedMessage = escapeHtml(message).replaceAll('\n', '<br />')
    const senderName = safeHeader(name)
    const submissionRef = makeSubmissionRef()

    await sendEmail({
      from: { name: defaultFromName, address: defaultFromAddress },
      replyTo: { name: senderName, address: email },
      to: contactRecipient,
      subject: `Nieuw contactformulier bericht van ${senderName} - ${submissionRef}`,
      headers: {
        'X-Entity-Ref-ID': `contact-form-${submissionRef}`,
        'X-Kathara-Nova-Contact-Ref': submissionRef
      },
      text: [
        `Referentie: ${submissionRef}`,
        `Naam: ${name}`,
        `E-mailadres: ${email}`,
        phone ? `Telefoon: ${phone}` : null,
        contactReason ? `Waarmee kan ik helpen: ${contactReason}` : null,
        '',
        message
      ].filter(Boolean).join('\n'),
      html: `
        <!doctype html>
        <html lang="nl">
          <body style="margin:0;background:#f7f1e6;color:#2a211a;font-family:Georgia,'Times New Roman',serif;">
            <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
              <div style="background:#fbf7ef;border:1px solid #e8dac2;border-radius:22px;overflow:hidden;box-shadow:0 12px 32px rgba(42,33,26,0.10);">
                <div style="background:#2a211a;padding:28px 30px;color:#fbf7ef;">
                  <div style="color:#e7c16a;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;">Kathara Nova</div>
                  <h1 style="margin:8px 0 0;font-size:30px;line-height:1.15;font-weight:700;">Nieuw contactformulier bericht</h1>
                  <p style="margin:10px 0 0;color:#e8dac2;font-family:Arial,sans-serif;font-size:13px;">Referentie ${submissionRef}</p>
                </div>
                <div style="padding:28px 30px 10px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;">
                    <tr>
                      <td style="padding:0 0 14px;color:#6f6257;width:180px;font-weight:700;">Naam</td>
                      <td style="padding:0 0 14px;color:#2a211a;">${escapedName}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 14px;color:#6f6257;font-weight:700;">E-mailadres</td>
                      <td style="padding:0 0 14px;"><a href="mailto:${escapedEmail}" style="color:#a87a22;text-decoration:none;font-weight:700;">${escapedEmail}</a></td>
                    </tr>
                    ${phone ? `<tr><td style="padding:0 0 14px;color:#6f6257;font-weight:700;">Telefoon</td><td style="padding:0 0 14px;color:#2a211a;">${escapedPhone}</td></tr>` : ''}
                    ${contactReason ? `<tr><td style="padding:0 0 14px;color:#6f6257;font-weight:700;">Waarmee kan ik helpen?</td><td style="padding:0 0 14px;color:#2a211a;">${escapedContactReason}</td></tr>` : ''}
                  </table>
                </div>
                <div style="margin:8px 30px 30px;padding:22px 24px;background:#f7f1e6;border:1px solid #e8dac2;border-radius:16px;font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#2a211a;">
                  ${escapedMessage}
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form email failed', error)
    return NextResponse.json({ error: 'Versturen is niet gelukt. Probeer het later opnieuw.' }, { status: 500 })
  }
}
