import { Button } from './Button'

export function CTASection({ title, text, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: { title: string; text?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string }) {
  return (
    <section>
      <div className="container section">
        <div className="cta-band">
          <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" className="cta-band-mark" />
          <div className="cta-band-copy">
            <span className="eyebrow">Volgende stap</span>
            <h2>{title}</h2>
            {text ? <p>{text}</p> : null}
          </div>
          <div className="cta-actions">
            {primaryLabel && primaryHref ? <Button href={primaryHref} variant="primary" size="lg">{primaryLabel}</Button> : null}
            {secondaryLabel && secondaryHref ? <Button href={secondaryHref} variant="secondary" size="lg">{secondaryLabel}</Button> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
