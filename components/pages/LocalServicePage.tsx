import { MapPin } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHero } from '@/components/ui/PageHero'
import type { SeoLandingPage } from '@/lib/types'

export function LocalServicePage({ page }: { page: SeoLandingPage }) {
  return (
    <main>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <section className="section">
        <div className="container grid-2 local-service-layout">
          <div className="prose-stack">
            {page.sections.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
          <aside className="sticky side-stack">
            <Card tone="sand" className="side-cta local-service-card">
              <span><MapPin size={24} /></span>
              <h3>{page.ctaTitle || 'Kathara Nova in Schoonoord'}</h3>
              <p>{page.ctaText || 'Op afspraak in Schoonoord, met begeleiding voor mensen uit Drenthe en omgeving.'}</p>
              <div className="local-service-highlights">
                {page.highlights.map((item) => <span key={item}>{item}</span>)}
              </div>
              <Button href="/contact" fullWidth>Plan een afspraak</Button>
              <Button href="/tarieven" variant="secondary" fullWidth>Bekijk tarieven</Button>
            </Card>
            <div className="local-service-links">
              <span>Ook relevant</span>
              {page.relatedLinks.map((link) => <Button key={link.href} href={link.href} variant="ghost" fullWidth>{link.label}</Button>)}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
