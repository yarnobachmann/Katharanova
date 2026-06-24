'use client'

import { ArrowRight, CalendarHeart, Check, Clock, Heart, MapPin, Sparkles, Tag, Users } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { TreatmentCard } from '@/components/cards/TreatmentCard'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/ui/CTASection'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { shortDate } from '@/lib/format'
import { normalizeHomepage } from '@/lib/live-preview'
import type { Treatment, Workshop } from '@/lib/types'

export function HomePreview({ page: initialPage, treatments, workshops }: { page: any; treatments: Treatment[]; workshops: Workshop[] }) {
  const page = usePayloadLivePreview({
    globalSlug: 'homepage',
    initialData: initialPage,
    normalize: normalizeHomepage
  })
  const metaItems = page.heroMetaItems?.length
    ? [...page.heroMetaItems].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [{ icon: 'map-pin', label: 'Online & op locatie' }, { icon: 'clock', label: 'Sessies 60-90 min' }]

  return (
    <main>
      <section className="home-hero">
        <div className="container hero-grid">
          <Reveal className="hero-copy" stagger variant="hero">
            <span className="eyebrow">{page.hero.eyebrow}</span>
            <h1>{page.hero.title}</h1>
            <p className="lead">{page.hero.intro}</p>
            <div className="hero-actions">
              <Button href="/contact" size="lg">Plan een afspraak</Button>
              <Button href="/transheling" variant="secondary" size="lg">Ontdek de behandelingen</Button>
            </div>
            <div className="hero-meta">
              {metaItems.map((item: any) => {
                const Icon = metaIcon(item.icon)
                return <span key={item.label}><Icon size={17} /> {item.label}</span>
              })}
            </div>
          </Reveal>
          <Reveal className="hero-media" variant="image" delay={0.12}>
            <ImageFrame src={page.hero.image} alt="Warm licht door bladeren" ratio="4 / 5" organic priority />
            <div className="hero-chip">
              <img src="/assets/logo-phoenix-mark.png" alt="" />
              <span>{page.heroChipText || 'Ruimte om te helen en te groeien'}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="recognition section-tight">
        <div className="container grid-2">
          <SectionHeading align="left" eyebrow="Herken je dit?" title={page.recognitionTitle} intro={page.recognitionIntro} divider />
          <Reveal stagger variant="section" className="check-list">
            {page.recognitionItems.map((item: string) => <div key={item}><Check size={17} />{item}</div>)}
          </Reveal>
        </div>
      </section>

      <section className="section section-with-soft-separator">
        <div className="container">
          <SectionHeading
            eyebrow={page.treatmentsEyebrow || 'Behandelingen'}
            title={page.treatmentsTitle || 'Werk dat je weer in beweging brengt'}
            intro={page.treatmentsIntro}
            divider
          />
          <Reveal stagger variant="cards" className="grid-3 cards-space">
            {treatments.map((treatment) => <TreatmentCard key={treatment.slug} treatment={treatment} />)}
          </Reveal>
        </div>
      </section>

      <section className="section section-after-soft-separator">
        <div className="container grid-2 about-preview">
          <Reveal variant="image"><ImageFrame src={page.aboutImage} alt="Zacht landschap bij ochtendlicht" ratio="1 / 1" tone="clay" organic /></Reveal>
          <Reveal variant="section">
            <SectionHeading align="left" eyebrow={page.aboutEyebrow || 'Over Kathara Nova'} title={page.aboutTitle} intro={page.aboutText} divider />
            <Button href="/over-mij" variant="secondary" iconRight={<ArrowRight size={18} />}>Lees meer over mij</Button>
          </Reveal>
        </div>
      </section>

      <section className="quote-band">
        <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" />
        <div className="container-text">
          <span>*</span>
          <p>&ldquo;{page.quote}&rdquo;</p>
          <div className="quote-divider" />
        </div>
      </section>

      <section className="workshop-preview section section-after-dark">
        <div className="container">
          <div className="section-split">
            <SectionHeading align="left" eyebrow={page.workshopPreviewEyebrow || 'Workshops'} title={page.workshopPreviewTitle} intro={page.workshopPreviewIntro} />
            <Button href="/workshops" variant="ghost" iconRight={<ArrowRight size={16} />}>Alle workshops</Button>
          </div>
          <Reveal stagger variant="cards" className="grid-3">
            {workshops.slice(0, 3).map((workshop) => (
              <Card key={workshop.slug} as="article" tone={workshop.tone} interactive className="mini-workshop">
                <div className="mini-workshop-top">
                  <strong>{shortDate(workshop.date)}</strong>
                  <CalendarHeart size={22} />
                </div>
                <h3>{workshop.title}</h3>
                <p>{workshop.excerpt}</p>
                <div className="mini-workshop-meta">
                  <span><MapPin size={15} />{workshop.location}</span>
                  <span><Clock size={15} />{workshop.durationLabel}</span>
                  <span><Users size={15} />{workshop.spotsLabel}</span>
                  <span><Tag size={15} />{workshop.price}</span>
                </div>
                <Button href="/contact" variant="secondary" size="sm" iconRight={<ArrowRight size={15} />}>Aanmelden</Button>
              </Card>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection {...page.cta} />
    </main>
  )
}

function metaIcon(icon: string) {
  if (icon === 'clock') return Clock
  if (icon === 'heart') return Heart
  if (icon === 'sparkles') return Sparkles
  return MapPin
}
