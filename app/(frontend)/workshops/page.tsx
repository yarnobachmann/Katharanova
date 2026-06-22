import { WorkshopsPreview } from '@/components/pages/WorkshopsPreview'
import { getWorkshops, getWorkshopsPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getWorkshopsPage()

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    image: page.hero.image,
    path: '/workshops'
  })
}

export default async function WorkshopsPage() {
  const [page, workshops] = await Promise.all([getWorkshopsPage(), getWorkshops()])

  return <WorkshopsPreview page={page} workshops={workshops} />
}
