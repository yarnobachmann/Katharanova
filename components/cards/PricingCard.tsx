import { Check } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { PricingItem } from '@/lib/types'

export function PricingCard({ item }: { item: PricingItem }) {
  return (
    <Card tone={item.tone} className={`pricing-card ${item.featured ? 'pricing-featured' : ''}`}>
      {item.featured ? <span className="pricing-badge"><Badge tone="solid">Meest gekozen</Badge></span> : null}
      <div>
        <h3>{item.title}</h3>
        <div className="price"><span>{item.price}</span></div>
      </div>
      <p>{item.description}</p>
      <ul>
        {item.features.map((feature) => <li key={feature}><Check size={18} />{feature}</li>)}
      </ul>
      <Button href={item.ctaHref} variant={item.featured ? 'primary' : 'secondary'} fullWidth>{item.ctaLabel}</Button>
    </Card>
  )
}
