import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHero } from '@/components/ui/PageHero'
import { safeHref } from '@/lib/safeUrl'
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
              <nav aria-label="Gerelateerde pagina's">
                {page.relatedLinks.map((link) => (
                  <Link key={link.href} href={safeHref(link.href)} className="local-service-link">
                    <span>{link.label}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
