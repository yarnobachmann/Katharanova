import { AboutPreview } from '@/components/pages/AboutPreview'
import { getAboutPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getAboutPage()

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    image: page.hero.image || page.portrait,
    path: '/over-mij'
  })
}

export default async function OverMijPage() {
  const page = await getAboutPage()

  return <AboutPreview page={page} />
}
