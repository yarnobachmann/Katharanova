'use client'

import * as Icons from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeTreatment } from '@/lib/live-preview'
import type { Treatment } from '@/lib/types'

export function TreatmentPageTemplate({ treatment: initialTreatment }: { treatment: Treatment }) {
  const treatment = usePayloadLivePreview({
    collectionSlug: 'treatments',
    initialData: initialTreatment,
    normalize: normalizeTreatment
  })
  const Icon = (Icons as any)[toIconName(treatment.icon)] || Icons.Sparkles
  return (
    <main>
      <PageHero eyebrow={treatment.eyebrow} title={treatment.title} intro={treatment.intro} />
      <section className="section">
        <div className="container grid-2 treatment-layout">
          <Reveal className="prose-stack" stagger variant="section">
            <ProseBlock title={treatment.whatTitle}><p>{treatment.whatBody}</p></ProseBlock>
            <ListBlock title={treatment.forWhoTitle || 'Voor wie is het bedoeld?'} items={treatment.forWho} />
            <div>
              <h2>{treatment.sessionTitle || 'Wat kun je verwachten tijdens een sessie?'}</h2>
              <div className="steps">
                {treatment.sessionSteps.map((step, index) => (
                  <div key={step.title}>
                    <span>{index + 1}</span>
                    <div><strong>{step.title}</strong><p>{step.description}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <ListBlock title={treatment.outcomesTitle || 'Mogelijke effecten'} items={treatment.outcomes} grid />
          </Reveal>
          <aside className="sticky side-stack">
            <ImageFrame src={treatment.image} alt={treatment.title} ratio="4 / 3" tone={treatment.tone === 'cream' ? 'sand' : treatment.tone} />
            <Card tone="sand" className="side-cta">
              <span><Icon size={24} /></span>
              <h3>{treatment.ctaTitle}</h3>
              <p>{treatment.ctaText}</p>
              <Button href="/contact" fullWidth>Plan een afspraak</Button>
              <Button href="/tarieven" variant="secondary" fullWidth>Bekijk tarieven</Button>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}

function ProseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2>{title}</h2><div className="prose-body">{children}</div></div>
}

function ListBlock({ title, items, grid = false }: { title: string; items: string[]; grid?: boolean }) {
  return (
    <div>
      <h2>{title}</h2>
      <div className={grid ? 'effect-grid' : 'list-checks'}>
        {items.map((item) => <div key={item}><Icons.CheckCircle2 size={20} />{item}</div>)}
      </div>
    </div>
  )
}

function toIconName(name: string) {
  return name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
