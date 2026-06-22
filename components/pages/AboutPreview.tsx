'use client'

import { CheckCircle2 } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { RichTextRenderer } from '@/components/cms/RichTextRenderer'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeAboutPage } from '@/lib/live-preview'

export function AboutPreview({ page: initialPage }: { page: any }) {
  const page = usePayloadLivePreview({
    globalSlug: 'about-page',
    initialData: initialPage,
    normalize: normalizeAboutPage
  })
  const stats = Array.isArray(page.stats) ? page.stats.filter((stat: any) => stat?.label || stat?.value) : []
  const methodSteps = Array.isArray(page.methodSteps) ? page.methodSteps.filter((step: any) => step?.title || step?.description) : []
  const forWho = Array.isArray(page.forWho) ? page.forWho.filter(Boolean) : []

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section">
        <div className="container grid-2 about-main">
          <aside className="sticky about-portrait">
            <ImageFrame src={page.portrait} alt="Portret Kathara Nova" ratio="3 / 4" tone="clay" />
            <div className="stats">
              {stats.map((stat: any, index: number) => <Card key={stat.label || index} tone="sand" className="stat-card"><strong>{stat.value}</strong><small>{stat.label}</small></Card>)}
            </div>
          </aside>
          <Reveal className="prose-stack" stagger variant="section">
            <section><h2>{page.introTitle || 'Introductie'}</h2><RichTextRenderer content={page.intro} /></section>
            <section><h2>{page.visionTitle || 'Mijn visie'}</h2><RichTextRenderer content={page.vision} /></section>
            <section>
              <h2>{page.workingMethodTitle || 'Werkwijze'}</h2>
              <RichTextRenderer content={page.workingMethod} />
              <div className="method-list">
                {methodSteps.map((step: any, index: number) => <div key={step.title || index}><span>{index + 1}</span><p><strong>{step.title}</strong><br />{step.description}</p></div>)}
              </div>
            </section>
            <section>
              <h2>{page.forWhoTitle || 'Voor wie mijn begeleiding bedoeld is'}</h2>
              <div className="list-checks">
                {forWho.map((item: string) => <div key={item}><CheckCircle2 size={20} />{item}</div>)}
              </div>
            </section>
            <Card tone="sage">
              <h3>{page.cta.title}</h3>
              <p>{page.cta.text}</p>
              <Button href={page.cta.primaryHref}>{page.cta.primaryLabel}</Button>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
