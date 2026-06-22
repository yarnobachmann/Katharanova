import * as Icons from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Treatment } from '@/lib/types'

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const Icon = (Icons as any)[toIconName(treatment.icon)] || Icons.Sparkles
  return (
    <Card as="article" tone={treatment.tone} interactive className="treatment-card">
      <span className="card-icon"><Icon size={26} strokeWidth={1.5} /></span>
      <Badge tone="gold">{treatment.eyebrow.split('·').pop()?.trim() || treatment.navLabel}</Badge>
      <h3>{treatment.title}</h3>
      <p>{treatment.summary}</p>
      <a href={`/${treatment.slug}`}>Lees meer <Icons.ArrowRight size={16} /></a>
    </Card>
  )
}

function toIconName(name: string) {
  return name.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}
