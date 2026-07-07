import { WorkshopsPreview } from '@/components/pages/WorkshopsPreview'
import { getWorkshops, getWorkshopsPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getWorkshopsPage()

  return createMetadata({
    title: 'Workshops persoonlijke groei in Schoonoord | Kathara Nova',
    description: 'Workshops rond heling, bewustwording en persoonlijke groei in een kleine groep bij Kathara Nova in Schoonoord.',
    image: page.hero.image,
    path: '/workshops'
  })
}

export default async function WorkshopsPage() {
  const [page, workshops] = await Promise.all([getWorkshopsPage(), getWorkshops()])

  return <WorkshopsPreview page={page} workshops={workshops} />
}
