import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { getSeoLandingPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

const slug = 'systeemopstelling-drenthe'

export async function generateMetadata() {
  const page = await getSeoLandingPage(slug)

  return createMetadata({
    title: page?.seo?.metaTitle || page?.title || 'Systeemopstelling in Drenthe | Kathara Nova',
    description: page?.seo?.metaDescription || page?.intro || 'Systeemopstelling en familieopstelling in Drenthe voor inzicht in patronen, relaties en terugkerende dynamieken.',
    path: `/${slug}`
  })
}

export default async function SysteemopstellingDrenthePage() {
  const page = await getSeoLandingPage(slug)
  if (!page) return null

  return <LocalServicePage page={page} />
}
