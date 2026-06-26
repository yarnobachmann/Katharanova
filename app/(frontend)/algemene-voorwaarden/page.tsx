import { LegalPagePreview } from '@/components/pages/LegalPagePreview'
import { getLegalPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getLegalPage('terms-page')

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    path: '/algemene-voorwaarden'
  })
}

export default async function TermsPage() {
  const page = await getLegalPage('terms-page')

  return <LegalPagePreview page={page} globalSlug="terms-page" />
}
