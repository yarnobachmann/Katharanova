'use client'

import * as Icons from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { WorkshopCard } from '@/components/cards/WorkshopCard'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { normalizeWorkshopList, normalizeWorkshopsPage } from '@/lib/live-preview'
import type { Workshop } from '@/lib/types'

export function WorkshopsPreview({ page: initialPage, workshops }: { page: any; workshops: Workshop[] }) {
  const page = usePayloadLivePreview({
    globalSlug: 'workshops-page',
    initialData: initialPage,
    normalize: normalizeWorkshopsPage
  })
  const previewWorkshops = usePayloadLivePreview({
    collectionSlug: 'workshops',
    initialData: workshops,
    normalize: normalizeWorkshopList
  })

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section">
        <Reveal stagger variant="cards" className="container grid-2">
          {previewWorkshops.map((workshop) => <WorkshopCard key={workshop.slug} workshop={workshop} />)}
        </Reveal>
      </section>
      <section className="section recognition">
        <div className="container grid-2">
          <SectionHeading align="left" eyebrow={page.groupHealingEyebrow || 'Waarom een groep?'} title={page.groupHealingTitle} intro={page.groupHealingText} divider />
          <Reveal stagger variant="section" className="check-list">
            {page.groupHealingItems.map((item: any) => {
              const Icon = (Icons as any)[toIconName(item.icon)] || Icons.Users
              return <div key={item.title}><Icon size={20} /><span><strong>{item.title}</strong><br />{item.description}</span></div>
            })}
          </Reveal>
        </div>
      </section>
      <section className="section">
        <Card tone="outline" className="container-text" as="div">
          <SectionHeading title={page.cta.title} intro={page.cta.text} />
          <div style={{ textAlign: 'center', marginTop: 24 }}><Button href={page.cta.primaryHref} size="lg">{page.cta.primaryLabel}</Button></div>
        </Card>
      </section>
    </main>
  )
}

function toIconName(name: string) {
  return name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
