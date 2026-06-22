export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'auto',
  divider = false
}: {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'auto' | 'light'
  divider?: boolean
}) {
  return (
    <div className={`section-heading section-heading-${align} ${tone === 'light' ? 'section-heading-light' : ''}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      {divider ? <span className="divider" /> : null}
      <h2>{title}</h2>
      {intro ? <p className="lead">{intro}</p> : null}
    </div>
  )
}
