import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Systeemopstelling in Drenthe | Kathara Nova',
  description: 'Systeemopstelling en familieopstelling in Drenthe voor inzicht in patronen, relaties en terugkerende dynamieken.',
  path: '/systeemopstelling-drenthe'
})

export default function SysteemopstellingDrenthePage() {
  return (
    <LocalServicePage
      eyebrow="Systeemopstelling Drenthe"
      title="Systeemopstelling in Drenthe"
      intro="Een opstelling bij Kathara Nova helpt zichtbaar maken welke patronen, loyaliteiten of dynamieken onbewust meebewegen."
      sections={[
        {
          title: 'Wat maakt een opstelling zichtbaar?',
          text: 'Een systeemopstelling of familieopstelling kan inzicht geven in terugkerende patronen binnen familie, relaties, werk of levensvragen. Wat onbewust meespeelt, krijgt ruimte om gezien te worden.'
        },
        {
          title: 'Voor welke vragen?',
          text: 'Een opstelling kan passend zijn bij terugkerende relatiepatronen, schuldgevoel, loyaliteit, familiebelasting, keuzes die vastzitten of situaties waarin je merkt dat ratio alleen niet genoeg is.'
        },
        {
          title: 'Op afspraak in Schoonoord',
          text: 'De begeleiding vindt plaats in een rustige praktijksetting in Schoonoord. Samen formuleren we je vraag en onderzoeken we wat zich op een veilige manier wil laten zien.'
        }
      ]}
      highlights={['Systeemopstelling', 'Familieopstelling', 'Schoonoord', 'Drenthe']}
      relatedLinks={[
        { label: 'Lees meer over opstellingen', href: '/opstelling' },
        { label: 'Holistische therapie', href: '/holistische-therapie-schoonoord' },
        { label: 'Contact', href: '/contact' }
      ]}
    />
  )
}
