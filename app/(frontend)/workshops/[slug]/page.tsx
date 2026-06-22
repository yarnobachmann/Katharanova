import { notFound } from 'next/navigation'

import { WorkshopDetailPreview } from '@/components/pages/WorkshopDetailPreview'
import { getWorkshop } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const workshop = await getWorkshop(slug)
  if (!workshop) return {}

  return createMetadata({
    title: workshop.seo?.metaTitle || pageTitle(workshop.title),
    description: workshop.seo?.metaDescription || workshop.excerpt,
    image: workshop.image,
    path: `/workshops/${workshop.slug}`
  })
}

export default async function WorkshopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const workshop = await getWorkshop(slug)
  if (!workshop) notFound()

  return <WorkshopDetailPreview workshop={workshop} />
}
