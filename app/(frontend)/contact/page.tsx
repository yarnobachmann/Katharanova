import { ContactPreview } from '@/components/pages/ContactPreview'
import { getContactPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getContactPage()

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    image: page.hero.image || page.image,
    path: '/contact'
  })
}

export default async function ContactPage() {
  const page = await getContactPage()

  return <ContactPreview page={page} />
}
