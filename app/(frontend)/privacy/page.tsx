import { LegalPagePreview } from '@/components/pages/LegalPagePreview'
import { getLegalPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getLegalPage('privacy-page')

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    path: '/privacy'
  })
}

export default async function PrivacyPage() {
  const page = await getLegalPage('privacy-page')

  return <LegalPagePreview page={page} globalSlug="privacy-page" />
}
