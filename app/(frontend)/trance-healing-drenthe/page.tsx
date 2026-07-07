import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { getSeoLandingPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

const slug = 'trance-healing-drenthe'

export async function generateMetadata() {
  const page = await getSeoLandingPage(slug)

  return createMetadata({
    title: page?.seo?.metaTitle || page?.title || 'Trance-healing in Drenthe | Kathara Nova',
    description: page?.seo?.metaDescription || page?.intro || 'Trance-healing en energetische begeleiding in Drenthe voor rust, bewustwording en persoonlijke groei.',
    path: `/${slug}`
  })
}

export default async function TranceHealingDrenthePage() {
  const page = await getSeoLandingPage(slug)
  if (!page) return null

  return <LocalServicePage page={page} />
}
