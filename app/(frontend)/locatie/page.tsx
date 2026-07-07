import { LocationPreview } from '@/components/pages/LocationPreview'
import { getLocationPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getLocationPage()

  return createMetadata({
    title: 'Praktijkruimte in Schoonoord | Kathara Nova',
    description: 'Een rustige praktijkruimte in Schoonoord voor holistische therapie, transheling, opstellingen en persoonlijke begeleiding.',
    image: page.hero.image || page.carouselItems?.[0]?.image,
    path: '/locatie'
  })
}

export default async function LocatiePage() {
  const page = await getLocationPage()

  return <LocationPreview page={page} />
}
