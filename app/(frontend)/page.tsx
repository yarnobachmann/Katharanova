import { HomePreview } from '@/components/pages/HomePreview'
import { getHomepage, getTreatments, getWorkshops } from '@/lib/cms'
import { createHomePageSchema, createMetadata, serializeJsonLd } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getHomepage()

  return createMetadata({
    title: 'Holistische therapie in Schoonoord | Kathara Nova',
    description: 'Kathara Nova begeleidt je in Schoonoord en Drenthe met transheling, opstellingen, innerlijk werk, heling en bewustwording.',
    image: page.hero.image,
    path: '/'
  })
}

export default async function HomePage() {
  const [page, treatments, workshops] = await Promise.all([getHomepage(), getTreatments(), getWorkshops()])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(createHomePageSchema()) }}
      />
      <HomePreview page={page} treatments={treatments} workshops={workshops} />
    </>
  )
}
