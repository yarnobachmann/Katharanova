import { notFound } from 'next/navigation'

import { TreatmentPageTemplate } from '@/components/pages/TreatmentPage'
import { getTreatment } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const treatment = await getTreatment('transhealing')
  if (!treatment) return {}

  return createMetadata({
    title: treatment.seo?.metaTitle || pageTitle(treatment.title),
    description: treatment.seo?.metaDescription || treatment.summary,
    image: treatment.image,
    path: '/transhealing'
  })
}

export default async function Page() {
  const treatment = await getTreatment('transhealing')
  if (!treatment) notFound()
  return <TreatmentPageTemplate treatment={treatment} />
}
