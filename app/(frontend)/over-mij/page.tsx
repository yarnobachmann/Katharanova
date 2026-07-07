import { AboutPreview } from '@/components/pages/AboutPreview'
import { getAboutPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getAboutPage()

  return createMetadata({
    title: 'Over Kathara Nova | Holistische begeleiding in Drenthe',
    description: 'Maak kennis met de mens achter Kathara Nova en de werkwijze rond holistische therapie, heling en bewustwording.',
    image: page.hero.image || page.portrait,
    path: '/over-mij'
  })
}

export default async function OverMijPage() {
  const page = await getAboutPage()

  return <AboutPreview page={page} />
}
