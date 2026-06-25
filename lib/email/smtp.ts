import nodemailer from 'nodemailer'
import type { SendMailOptions } from 'nodemailer'
import type { EmailAdapter } from 'payload'

const toBool = (value?: string) => value === 'true' || value === '1'

const smtpPort = () => Number(process.env.SMTP_PORT || 587)

const smtpSecure = () => {
  if (process.env.SMTP_SECURE) return toBool(process.env.SMTP_SECURE)
  return smtpPort() === 465
}

export const contactRecipient = process.env.CONTACT_TO_EMAIL || 'katharanova@gmail.com'
export const defaultFromAddress = process.env.SMTP_FROM_ADDRESS || process.env.SMTP_USER || 'noreply@katharanova.nl'
export const defaultFromName = process.env.SMTP_FROM_NAME || 'Kathara Nova'

function assertSmtpConfigured() {
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter((name) => !process.env[name])

  if (missing.length) {
    throw new Error(`Email is not configured. Missing ${missing.join(', ')}.`)
  }
}

export function createTransport() {
  assertSmtpConfigured()

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort(),
    secure: smtpSecure(),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

export async function sendEmail(message: SendMailOptions) {
  const transport = createTransport()
  return transport.sendMail(message)
}

export const smtpEmailAdapter = (): EmailAdapter => () => ({
  name: 'smtp',
  defaultFromAddress,
  defaultFromName,
  sendEmail: async (message) => sendEmail(message)
})
