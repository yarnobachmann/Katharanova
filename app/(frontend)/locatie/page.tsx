import { LocationPreview } from '@/components/pages/LocationPreview'
import { getLocationPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getLocationPage()

  return createMetadata({
    title: pageTitle(page.hero.title || 'Locatie'),
    description: page.hero.intro || 'Een indruk van de praktijkruimte van Kathara Nova.',
    image: page.hero.image || page.carouselItems?.[0]?.image,
    path: '/locatie'
  })
}

export default async function LocatiePage() {
  const page = await getLocationPage()

  return <LocationPreview page={page} />
}
