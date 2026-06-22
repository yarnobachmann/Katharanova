'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/Button'

export function ContactForm({
  intro,
  availabilityText
}: {
  intro?: string
  availabilityText?: string
}) {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="form-success">
        <span><Check size={30} /></span>
        <h3>Dankjewel - je bericht is klaar om te versturen</h3>
        <p>De formulierinterface is voorbereid voor een echte integratie.</p>
        <Button variant="secondary" onClick={() => setSent(false)}>Nieuw bericht</Button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
      {intro ? <p className="form-intro">{intro}</p> : null}
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
              <option>Transhealing</option>
              <option>Opstelling</option>
              <option>Innerlijk werk</option>
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
      <div className="form-actions">
        <Button type="submit" size="lg">Verstuur bericht</Button>
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
