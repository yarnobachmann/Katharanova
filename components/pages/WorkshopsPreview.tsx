'use client'

import * as Icons from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { WorkshopCard } from '@/components/cards/WorkshopCard'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { CTASection } from '@/components/ui/CTASection'
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
            {page.groupHealingItems.filter((item: any) => item?.title || item?.description).map((item: any) => {
              const Icon = (Icons as any)[toIconName(item.icon)] || Icons.Users
              return <div key={item.title}><Icon size={20} /><span><strong>{item.title}</strong><br />{item.description}</span></div>
            })}
          </Reveal>
        </div>
      </section>
      <CTASection {...page.cta} />
    </main>
  )
}

function toIconName(name?: string) {
  if (!name) return 'Users'
  return name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
