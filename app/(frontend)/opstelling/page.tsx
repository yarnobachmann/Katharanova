import { notFound } from 'next/navigation'

import { TreatmentPageTemplate } from '@/components/pages/TreatmentPage'
import { getTreatment } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const treatment = await getTreatment('opstelling')
  if (!treatment) return {}

  return createMetadata({
    title: treatment.seo?.metaTitle || 'Systeemopstelling in Drenthe | Kathara Nova',
    description: treatment.seo?.metaDescription || 'Krijg inzicht in familiepatronen, relaties en terugkerende dynamieken met een opstelling bij Kathara Nova.',
    image: treatment.image,
    path: '/opstelling'
  })
}

export default async function Page() {
  const treatment = await getTreatment('opstelling')
  if (!treatment) notFound()
  return <TreatmentPageTemplate treatment={treatment} />
}
