'use client'

import { FAQAccordion } from '@/components/FAQAccordion'
import { PricingCard } from '@/components/cards/PricingCard'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { CTASection } from '@/components/ui/CTASection'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { normalizeSimplePage } from '@/lib/live-preview'
import type { FAQ, PricingItem } from '@/lib/types'

export function TarievenPreview({ page: initialPage, items, faqItems }: { page: any; items: PricingItem[]; faqItems: FAQ[] }) {
  const page = usePayloadLivePreview({
    globalSlug: 'tarieven-page',
    initialData: initialPage,
    normalize: normalizeSimplePage
  })

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {items.map((item) => <PricingCard key={item.title} item={item} />)}
          </div>
          <div className="cards-space">
            <SectionHeading eyebrow={page.faqEyebrow || 'Goed om te weten'} title={page.faqTitle} intro={page.faqIntro} divider />
            <div className="container-text"><FAQAccordion items={faqItems} /></div>
          </div>
        </div>
      </section>
      <CTASection {...page.cta} />
    </main>
  )
}
