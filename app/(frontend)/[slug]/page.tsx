import { notFound } from 'next/navigation'

import { TreatmentPageTemplate } from '@/components/pages/TreatmentPage'
import { getTreatment } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const treatment = await getTreatment(slug)
  if (!treatment) return {}

  return createMetadata({
    title: treatment.seo?.metaTitle || pageTitle(treatment.title),
    description: treatment.seo?.metaDescription || treatment.summary,
    image: treatment.image,
    path: `/${treatment.slug}`
  })
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const treatment = await getTreatment(slug)
  if (!treatment) notFound()

  return <TreatmentPageTemplate treatment={treatment} />
}
