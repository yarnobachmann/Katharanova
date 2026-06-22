import { ImageFrame } from './ImageFrame'

export function PageHero({ eyebrow, title, intro, image, tone = 'cream' }: { eyebrow: string; title: string; intro: string; image?: string; tone?: 'cream' | 'dark' }) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" className="page-hero-mark" />
      <div className={image ? 'container page-hero-inner' : 'container-text'}>
        <div className="page-hero-copy">
          <div className={`section-heading section-heading-left ${tone === 'dark' ? 'section-heading-light' : ''}`}>
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h1>{title}</h1>
            {intro ? <p className="lead">{intro}</p> : null}
            <div className="divider" />
          </div>
        </div>
        {image ? (
          <div className="page-hero-media">
            <ImageFrame src={image} alt={title} ratio="4 / 3" tone={tone === 'dark' ? 'dark' : 'sand'} organic />
          </div>
        ) : null}
      </div>
    </section>
  )
}
