import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { getSeoLandingPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

const slug = 'holistische-therapie-schoonoord'

export async function generateMetadata() {
  const page = await getSeoLandingPage(slug)

  return createMetadata({
    title: page?.seo?.metaTitle || page?.title || 'Holistische therapie in Schoonoord | Kathara Nova',
    description: page?.seo?.metaDescription || page?.intro || 'Holistische therapie, heling en bewustwording in Schoonoord voor wie vastloopt in klachten, emoties of patronen.',
    path: `/${slug}`
  })
}

export default async function HolistischeTherapieSchoonoordPage() {
  const page = await getSeoLandingPage(slug)
  if (!page) return null

  return <LocalServicePage page={page} />
}
