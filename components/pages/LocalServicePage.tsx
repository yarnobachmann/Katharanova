import { MapPin } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHero } from '@/components/ui/PageHero'

type LocalServicePageProps = {
  eyebrow: string
  title: string
  intro: string
  sections: {
    title: string
    text: string
  }[]
  highlights: string[]
  relatedLinks: {
    label: string
    href: string
  }[]
}

export function LocalServicePage({ eyebrow, title, intro, sections, highlights, relatedLinks }: LocalServicePageProps) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="section">
        <div className="container grid-2 local-service-layout">
          <div className="prose-stack">
            {sections.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            ))}
          </div>
          <aside className="sticky side-stack">
            <Card tone="sand" className="side-cta local-service-card">
              <span><MapPin size={24} /></span>
              <h3>Kathara Nova in Schoonoord</h3>
              <p>Op afspraak in Schoonoord, met begeleiding voor mensen uit Drenthe en omgeving.</p>
              <div className="local-service-highlights">
                {highlights.map((item) => <span key={item}>{item}</span>)}
              </div>
              <Button href="/contact" fullWidth>Plan een afspraak</Button>
              <Button href="/tarieven" variant="secondary" fullWidth>Bekijk tarieven</Button>
            </Card>
            <div className="local-service-links">
              <span>Ook relevant</span>
              {relatedLinks.map((link) => <Button key={link.href} href={link.href} variant="ghost" fullWidth>{link.label}</Button>)}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
