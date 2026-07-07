import { notFound } from 'next/navigation'

import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { TreatmentPageTemplate } from '@/components/pages/TreatmentPage'
import { getSeoLandingPage, getTreatment } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [treatment, seoPage] = await Promise.all([getTreatment(slug), getSeoLandingPage(slug)])
  if (!treatment && !seoPage) return {}

  if (seoPage) {
    return createMetadata({
      title: seoPage.seo?.metaTitle || seoPage.title,
      description: seoPage.seo?.metaDescription || seoPage.intro,
      path: `/${seoPage.slug}`
    })
  }

  return createMetadata({
    title: treatment!.seo?.metaTitle || treatmentMetaTitle(treatment!.slug, treatment!.title),
    description: treatment!.seo?.metaDescription || treatmentMetaDescription(treatment!.slug, treatment!.summary),
    image: treatment!.image,
    path: `/${treatment!.slug}`
  })
}

function treatmentMetaTitle(slug: string, title: string) {
  if (slug === 'transheling') return 'Transheling in Drenthe | Kathara Nova'
  if (slug === 'innerlijke-werk') return 'Innerlijk werk en overtuigingen transformeren | Kathara Nova'
  if (slug === 'opstelling') return 'Systeemopstelling in Drenthe | Kathara Nova'
  return pageTitle(title)
}

function treatmentMetaDescription(slug: string, summary: string) {
  if (slug === 'transheling') return 'Transheling en energetische begeleiding voor rust, bewustwording en persoonlijke groei bij Kathara Nova in Drenthe.'
  if (slug === 'innerlijke-werk') return 'Begeleiding bij belemmerende overtuigingen, emoties en persoonlijke groei bij Kathara Nova in Schoonoord.'
  if (slug === 'opstelling') return 'Krijg inzicht in familiepatronen, relaties en terugkerende dynamieken met een opstelling bij Kathara Nova.'
  return summary
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [treatment, seoPage] = await Promise.all([getTreatment(slug), getSeoLandingPage(slug)])

  if (seoPage) return <LocalServicePage page={seoPage} />
  if (!treatment) notFound()

  return <TreatmentPageTemplate treatment={treatment} />
}
