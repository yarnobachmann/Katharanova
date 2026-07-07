import { TarievenPreview } from '@/components/pages/TarievenPreview'
import { getFaqs, getPricingItems, getTarievenPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getTarievenPage()

  return createMetadata({
    title: 'Tarieven holistische therapie en opstellingen | Kathara Nova',
    description: 'Bekijk de tarieven voor 1-op-1 sessies, transheling, innerlijk werk, opstellingen en workshops bij Kathara Nova.',
    image: page.hero.image,
    path: '/tarieven'
  })
}

export default async function TarievenPage() {
  const [page, items, faqItems] = await Promise.all([getTarievenPage(), getPricingItems(), getFaqs('tarieven')])

  return <TarievenPreview page={page} items={items} faqItems={faqItems} />
}
