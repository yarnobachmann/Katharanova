import { ContactPreview } from '@/components/pages/ContactPreview'
import { getContactPage } from '@/lib/cms'
import { createMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getContactPage()

  return createMetadata({
    title: 'Contact met Kathara Nova in Schoonoord | Plan een afspraak',
    description: 'Stel je vraag of plan een afspraak voor holistische therapie, transheling of een opstelling bij Kathara Nova in Schoonoord.',
    image: page.hero.image || page.image,
    path: '/contact'
  })
}

export default async function ContactPage() {
  const page = await getContactPage()

  return <ContactPreview page={page} />
}
