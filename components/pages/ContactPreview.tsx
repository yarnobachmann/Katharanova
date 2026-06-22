'use client'

import * as Icons from 'lucide-react'

import { ContactForm } from '@/components/ContactForm'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeContactPage } from '@/lib/live-preview'

export function ContactPreview({ page: initialPage }: { page: any }) {
  const page = usePayloadLivePreview({
    globalSlug: 'contact-page',
    initialData: initialPage,
    normalize: normalizeContactPage
  })

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section">
        <div className="container grid-2 contact-layout">
          <Card tone="cream" className="contact-form-card">
            <ContactForm intro={page.formIntro} availabilityText={page.availabilityText} />
          </Card>
          <aside className="side-stack">
            <div className="contact-card-list">
              {page.contactCards.filter((card: any) => card?.label || card?.value).map((card: any) => {
                const Icon = (Icons as any)[toIconName(card.icon)] || Icons.Mail
                return <div key={card.label}><Icon /><span><small>{card.label}</small><strong>{card.value}</strong></span></div>
              })}
            </div>
            <ImageFrame src={page.image} alt="Zonnig bospad" ratio="16 / 10" tone="sage" />
            <Card tone="sage">
              <span style={{ color: 'var(--accent-hover)', fontSize: 22 }}>*</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', fontStyle: 'italic', lineHeight: 1.4 }}>&ldquo;{page.quote}&rdquo;</p>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}

function toIconName(name?: string) {
  if (!name) return 'Mail'
  return name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
