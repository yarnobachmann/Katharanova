import { TarievenPreview } from '@/components/pages/TarievenPreview'
import { getFaqs, getPricingItems, getTarievenPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getTarievenPage()

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    image: page.hero.image,
    path: '/tarieven'
  })
}

export default async function TarievenPage() {
  const [page, items, faqItems] = await Promise.all([getTarievenPage(), getPricingItems(), getFaqs('tarieven')])

  return <TarievenPreview page={page} items={items} faqItems={faqItems} />
}
