import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Holistische therapie in Schoonoord | Kathara Nova',
  description: 'Holistische therapie, heling en bewustwording in Schoonoord voor wie vastloopt in klachten, emoties of patronen.',
  path: '/holistische-therapie-schoonoord'
})

export default function HolistischeTherapieSchoonoordPage() {
  return (
    <LocalServicePage
      eyebrow="Holistische therapie Schoonoord"
      title="Holistische therapie in Schoonoord"
      intro="Kathara Nova begeleidt je met aandacht voor lichaam, emoties, patronen en bewustwording, op afspraak in Schoonoord."
      sections={[
        {
          title: 'Voor wie is holistische therapie bedoeld?',
          text: 'Deze begeleiding kan passend zijn als je vastloopt in terugkerende patronen, innerlijke onrust, stress, oude emoties of levensvragen. We kijken niet alleen naar de klacht, maar ook naar wat eronder ligt.'
        },
        {
          title: 'Wat kun je verwachten?',
          text: 'Tijdens een sessie stemmen we af op jouw vraag en werken we in jouw tempo. Afhankelijk van wat nodig is kan de begeleiding bestaan uit transheling, innerlijk werk, systemisch kijken of praktische integratie.'
        },
        {
          title: 'Praktisch',
          text: 'Sessies zijn op afspraak in Schoonoord. Je hoeft vooraf nog niet precies te weten welke vorm past; een eerste vraag stellen is genoeg om samen te kijken wat klopt.'
        }
      ]}
      highlights={['Schoonoord', 'Drenthe', 'Op afspraak', 'Online mogelijk']}
      relatedLinks={[
        { label: 'Transheling', href: '/transheling' },
        { label: 'Opstelling', href: '/opstelling' },
        { label: 'Contact', href: '/contact' }
      ]}
    />
  )
}
