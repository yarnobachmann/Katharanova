import { CalendarHeart, Clock, MapPin, Tag, Users } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { workshopDateLabel } from '@/lib/format'
import type { Workshop } from '@/lib/types'

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Link href={`/workshops/${workshop.slug}`} className="workshop-card-link" aria-label={`Bekijk workshop ${workshop.title}`}>
      <Card as="article" tone={workshop.tone} interactive className="workshop-card">
        <ImageFrame src={workshop.image} alt={workshop.title} ratio="16 / 9" tone={workshop.tone === 'cream' ? 'sand' : workshop.tone} />
        <div className="card-row">
          <Badge tone="gold">{workshopDateLabel(workshop.date, workshop.dateLabel || 'Op aanvraag')}</Badge>
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
        <span className="btn btn-primary btn-sm btn-full workshop-card-cta">Meer info</span>
      </Card>
    </Link>
  )
}

