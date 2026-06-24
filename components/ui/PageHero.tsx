import { ImageFrame } from './ImageFrame'

export function PageHero({ eyebrow, title, intro, image, tone = 'cream' }: { eyebrow: string; title: string; intro: string; image?: string; tone?: 'cream' }) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" className="page-hero-mark" />
      <div className={image ? 'container page-hero-inner' : 'container-text'}>
        <div className="page-hero-copy">
          <div className="section-heading section-heading-left">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <div className="divider" />
            <h1>{title}</h1>
            {intro ? <p className="lead">{intro}</p> : null}
          </div>
        </div>
        {image ? (
          <div className="page-hero-media">
            <ImageFrame src={image} alt={title} ratio="4 / 3" tone="sand" organic />
          </div>
        ) : null}
      </div>
    </section>
  )
}
