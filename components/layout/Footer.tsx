import { Instagram, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/ui/Logo'
import type { Navigation, SiteSettings } from '@/lib/types'

export function Footer({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const treatments = [...(navigation.treatmentItems || []), ...navigation.navItems.filter((item) => item.href === '/workshops')]
  const practice = withRequiredItems(
    navigation.navItems.filter((item) => ['/over-mij', '/fotogallerij', '/locatie', '/tarieven', '/contact', '/blog'].includes(item.href)),
    [
      { item: { label: 'Fotogallerij', href: '/fotogallerij' }, index: 1 },
      { item: { label: 'Locatie', href: '/locatie' }, index: 2 }
    ]
  )

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo mark={settings.logoMark} full={settings.logoFull} />
          <p>{settings.footerText}</p>
          <div className="footer-socials">
            {settings.instagram ? <Link href={settings.instagram} aria-label="Instagram"><Instagram size={18} /></Link> : null}
            {settings.linkedin ? <Link href={settings.linkedin} aria-label="LinkedIn"><Linkedin size={18} /></Link> : null}
            <Link href={`mailto:${settings.email}`} aria-label="E-mail"><Mail size={18} /></Link>
          </div>
        </div>
        <FooterCol title="Behandelingen" items={treatments} />
        <FooterCol title="Praktijk" items={practice} />
        <div className="footer-col">
          <span>Contact</span>
          <Link href={`mailto:${settings.email}`}>{settings.email}</Link>
          <Link href={`tel:${settings.phone.replaceAll(' ', '')}`}>{settings.phone}</Link>
          <p>{settings.location}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {settings.copyright}</span>
        <div className="footer-legal-links">
          {settings.kvkText ? <span>{settings.kvkText}</span> : null}
          <Link href="/algemene-voorwaarden">Algemene voorwaarden</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

function withRequiredItems(items: { label: string; href: string }[], requiredItems: { item: { label: string; href: string }; index: number }[]) {
  const nextItems = [...items]
  requiredItems.forEach(({ item, index }) => {
    if (nextItems.some((navItem) => navItem.href === item.href)) return
    nextItems.splice(index, 0, item)
  })
  return nextItems
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="footer-col">
      <span>{title}</span>
      {items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </div>
  )
}
