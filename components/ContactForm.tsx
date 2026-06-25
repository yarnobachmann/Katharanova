'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useState, useTransition } from 'react'

import { Button } from './ui/Button'

export function ContactForm({
  intro,
  availabilityText
}: {
  intro?: string
  availabilityText?: string
}) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    startTransition(async () => {
      try {
        const response = await fetch('/contact/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const result = await response.json().catch(() => ({}))

        if (!response.ok) {
          setError(result.error || 'Versturen is niet gelukt. Probeer het later opnieuw.')
          return
        }

        form.reset()
        setSent(true)
      } catch {
        setError('Versturen is niet gelukt. Controleer je verbinding en probeer opnieuw.')
      }
    })
  }

  if (sent) {
    return (
      <div className="form-success">
        <span><Check size={30} /></span>
        <h3>Dankjewel - je bericht is verstuurd</h3>
        <p>Ik neem zo snel mogelijk contact met je op.</p>
        <Button variant="secondary" onClick={() => setSent(false)}>Nieuw bericht</Button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      {intro ? <p className="form-intro">{intro}</p> : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      <div className="form-grid">
        <Field label="Naam" name="naam" required placeholder="Je naam" />
        <Field label="E-mailadres" name="email" type="email" required placeholder="naam@voorbeeld.nl" />
      </div>
      <div className="form-grid">
        <Field label="Telefoon" name="telefoon" type="tel" placeholder="06 ..." hint="Optioneel" />
        <label className="field">
          <span>Voorkeursbehandeling</span>
          <span className="select-wrap">
            <select name="voorkeursbehandeling" defaultValue="">
              <option value="" disabled>Maak een keuze...</option>
              <option>Weet ik nog niet</option>
              <option>Transheling</option>
              <option>Opstelling</option>
              <option>Innerlijke werk</option>
              <option>Workshop</option>
              <option>Kennismakingsgesprek</option>
            </select>
            <ChevronDown size={18} />
          </span>
        </label>
      </div>
      <label className="field">
        <span>Bericht</span>
        <textarea name="bericht" rows={5} required placeholder="Vertel kort waar je tegenaan loopt..." />
      </label>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <div className="form-actions">
        <Button type="submit" size="lg" disabled={isPending}>{isPending ? 'Versturen...' : 'Verstuur bericht'}</Button>
        <small>{availabilityText || 'Je gegevens worden vertrouwelijk behandeld.'}</small>
      </div>
    </form>
  )
}

function Field({ label, hint, ...props }: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {hint ? <small>{hint}</small> : null}
    </label>
  )
}
