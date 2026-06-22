import { CalendarHeart, Clock, MapPin, Tag, Users } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { formatDate } from '@/lib/format'
import type { Workshop } from '@/lib/types'

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Card as="article" tone={workshop.tone} interactive className="workshop-card">
      <ImageFrame src={workshop.image} alt={workshop.title} ratio="16 / 9" tone={workshop.tone === 'cream' ? 'sand' : workshop.tone} />
      <div className="card-row">
        <Badge tone="gold">{formatDate(workshop.date)}</Badge>
        <CalendarHeart size={22} />
      </div>
      <h3>{workshop.title}</h3>
      <p>{workshop.excerpt}</p>
      <dl className="workshop-meta">
        <div><MapPin size={15} /><dt>Locatie</dt><dd>{workshop.location}</dd></div>
        <div><Clock size={15} /><dt>Duur</dt><dd>{workshop.durationLabel}</dd></div>
        <div><Users size={15} /><dt>Plekken</dt><dd>{workshop.spotsLabel}</dd></div>
        <div><Tag size={15} /><dt>Prijs</dt><dd>{workshop.price}</dd></div>
      </dl>
      <Button href={`/workshops/${workshop.slug}`} size="sm" fullWidth>Meer info</Button>
    </Card>
  )
}
