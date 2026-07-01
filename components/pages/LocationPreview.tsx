'use client'

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { RichTextRenderer } from '@/components/cms/RichTextRenderer'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeLocationPage } from '@/lib/live-preview'

export function LocationPreview({ page: initialPage }: { page: any }) {
  const page = usePayloadLivePreview({
    globalSlug: 'location-page',
    initialData: initialPage,
    normalize: normalizeLocationPage
  })
  const carouselItems = Array.isArray(page.carouselItems) ? page.carouselItems.filter((item: any) => item?.image) : []
  const textBlocks = Array.isArray(page.textBlocks) ? page.textBlocks.filter((block: any) => block?.title || block?.text) : []

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section location-section">
        <div className="container location-layout">
          <Reveal className="location-copy" variant="section">
            <span className="location-kicker"><MapPin size={18} /> Praktijkruimte</span>
            <h2>{page.introTitle || 'Welkom in de praktijk'}</h2>
            <RichTextRenderer content={page.intro} />
          </Reveal>
          {carouselItems.length ? <LocationCarousel items={carouselItems} title={page.hero?.title || 'Locatie'} /> : null}
        </div>
      </section>
      {textBlocks.length ? (
        <section className="section-tight location-text-section section-after-soft-separator">
          <div className="container location-text-grid">
            {textBlocks.map((block: any, index: number) => (
              <Reveal className="location-text-block" key={block.title || index} variant="cards">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
      {page.cta?.title ? (
        <section className="section-tight location-cta">
          <div className="container-text">
            <Reveal className="location-cta-inner" variant="section">
              <h2>{page.cta.title}</h2>
              {page.cta.text ? <p>{page.cta.text}</p> : null}
              <div className="location-cta-actions">
                {page.cta.primaryLabel && page.cta.primaryHref ? <Button href={page.cta.primaryHref}>{page.cta.primaryLabel}</Button> : null}
                {page.cta.secondaryLabel && page.cta.secondaryHref ? <Button href={page.cta.secondaryHref} variant="ghost">{page.cta.secondaryLabel}</Button> : null}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function LocationCarousel({ items, title }: { items: any[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, index))
    const slide = trackRef.current?.children[nextIndex] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActiveIndex(nextIndex)
  }

  const updateActiveIndex = () => {
    const track = trackRef.current
    if (!track) return
    const nextIndex = Math.round(track.scrollLeft / Math.max(1, track.clientWidth))
    setActiveIndex(Math.max(0, Math.min(items.length - 1, nextIndex)))
  }

  return (
    <Reveal className="location-carousel" variant="section">
      <div className="location-carousel-frame">
        <div className="location-carousel-track" ref={trackRef} onScroll={updateActiveIndex} tabIndex={0} aria-label="Locatie afbeeldingen">
          {items.map((item, index) => (
            <figure className="location-slide" key={`${item.image}-${index}`}>
              <img src={item.image} alt={item.caption || `${title} afbeelding ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
        {items.length > 1 ? (
          <div className="location-carousel-controls">
            <button type="button" aria-label="Vorige afbeelding" onClick={() => scrollToIndex(activeIndex - 1)}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Volgende afbeelding" onClick={() => scrollToIndex(activeIndex + 1)}>
              <ChevronRight size={20} />
            </button>
          </div>
        ) : null}
      </div>
      {items.length > 1 ? (
        <div className="location-carousel-dots" aria-label="Afbeelding kiezen">
          {items.map((item, index) => (
            <button
              type="button"
              key={`${item.image}-dot-${index}`}
              className={activeIndex === index ? 'active' : ''}
              aria-label={`Toon afbeelding ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </Reveal>
  )
}
