import { HomePreview } from '@/components/pages/HomePreview'
import { getHomepage, getTreatments, getWorkshops } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getHomepage()

  return createMetadata({
    title: 'Kathara Nova - Holistische therapie, heling & bewustwording',
    description: page.hero.intro,
    image: page.hero.image,
    path: '/'
  })
}

export default async function HomePage() {
  const [page, treatments, workshops] = await Promise.all([getHomepage(), getTreatments(), getWorkshops()])

  return <HomePreview page={page} treatments={treatments} workshops={workshops} />
}
