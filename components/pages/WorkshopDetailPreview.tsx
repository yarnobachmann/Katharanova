'use client'

import { ArrowLeft, CalendarHeart, Clock, MapPin, Tag, Users } from 'lucide-react'
import Link from 'next/link'

import { RichTextRenderer } from '@/components/cms/RichTextRenderer'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { workshopDateLabel } from '@/lib/format'
import { normalizeWorkshop } from '@/lib/live-preview'
import type { Workshop } from '@/lib/types'

export function WorkshopDetailPreview({ workshop: initialWorkshop }: { workshop: Workshop }) {
  const workshop = usePayloadLivePreview({
    collectionSlug: 'workshops',
    initialData: initialWorkshop,
    normalize: normalizeWorkshop
  })

  return (
    <main>
      <section className="page-hero">
        <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" className="page-hero-mark" />
        <div className="container-text">
          <Link href="/workshops" className="back-link"><ArrowLeft size={16} /> Terug naar workshops</Link>
          <div className="article-hero-meta">
            <span className="badge badge-gold"><CalendarHeart size={15} />{workshopDateLabel(workshop.date, workshop.dateLabel || 'Op aanvraag')}</span>
          </div>
          <h1>{workshop.title}</h1>
          <p className="lead">{workshop.excerpt}</p>
        </div>
      </section>
      <div className="container article-image-wrap"><ImageFrame src={workshop.image} alt={workshop.title} ratio="21 / 9" tone={workshop.tone === 'cream' ? 'sand' : workshop.tone} /></div>
      <section className="section workshop-detail">
        <div className="container grid-2 treatment-layout">
          <article className="article-body">
            <RichTextRenderer content={workshop.content || workshop.excerpt} />
          </article>
          <aside className="sticky side-stack">
            <Card tone="cream" className="workshop-detail-card">
              <h3>Praktisch</h3>
              <dl className="workshop-meta workshop-meta-detail">
                <div><MapPin size={16} /><dt>Locatie</dt><dd>{workshop.location}</dd></div>
                <div><Clock size={16} /><dt>Duur</dt><dd>{workshop.durationLabel}</dd></div>
                <div><Users size={16} /><dt>Plekken</dt><dd>{workshop.spotsLabel}</dd></div>
                <div><Tag size={16} /><dt>Prijs</dt><dd>{workshop.price}</dd></div>
              </dl>
              <Button href="/contact" fullWidth>Aanmelden</Button>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}

