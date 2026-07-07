import { LocalServicePage } from '@/components/pages/LocalServicePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Trance-healing in Drenthe | Kathara Nova',
  description: 'Trance-healing en energetische begeleiding in Drenthe voor rust, bewustwording en persoonlijke groei.',
  path: '/trance-healing-drenthe'
})

export default function TranceHealingDrenthePage() {
  return (
    <LocalServicePage
      eyebrow="Trance-healing Drenthe"
      title="Trance-healing in Drenthe"
      intro="Bij Kathara Nova in Schoonoord kun je terecht voor transheling: energetisch en bewustzijnsgericht werk in een rustige setting."
      sections={[
        {
          title: 'Wat is trance-healing?',
          text: 'Transheling is een vorm van energetische begeleiding waarbij rust, aandacht en bewustwording centraal staan. De sessie nodigt je uit om te vertragen en te onderzoeken wat gezien of verzacht mag worden.'
        },
        {
          title: 'Wanneer kan het passen?',
          text: 'Mensen komen vaak met spanning, vermoeidheid, terugkerende emoties, oude overtuigingen of het gevoel vast te zitten. De sessie is bedoeld als ondersteuning bij bewustwording en innerlijke ruimte.'
        },
        {
          title: 'Locatie en afspraak',
          text: 'De praktijk is gevestigd in Schoonoord en werkt op afspraak. Woon je in Drenthe, bijvoorbeeld rond Coevorden of Emmen, dan is de praktijk goed bereikbaar.'
        }
      ]}
      highlights={['Transheling', 'Schoonoord', 'Drenthe', 'Rust en bewustwording']}
      relatedLinks={[
        { label: 'Lees meer over transheling', href: '/transheling' },
        { label: 'Bekijk tarieven', href: '/tarieven' },
        { label: 'Plan een afspraak', href: '/contact' }
      ]}
    />
  )
}
