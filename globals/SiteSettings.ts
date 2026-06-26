import type { GlobalConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site instellingen',
  admin: { group: 'Instellingen' },
  access: { read: () => true, update: admins },
  fields: [
    { name: 'siteName', label: 'Sitenaam', type: 'text', defaultValue: 'Kathara Nova', required: true },
    { name: 'siteTitle', label: 'SEO titel website', type: 'text', defaultValue: 'Kathara Nova - Holistische therapie, heling & bewustwording' },
    { name: 'siteDescription', label: 'SEO omschrijving website', type: 'textarea', defaultValue: 'Een warme praktijk voor holistische therapie, heling en bewustwording.' },
    { name: 'logoMark', label: 'Logo icoon', type: 'upload', relationTo: 'media' },
    { name: 'logoFull', label: 'Volledig logo', type: 'upload', relationTo: 'media' },
    { name: 'email', label: 'E-mailadres', type: 'email', defaultValue: 'hallo@katharanova.nl' },
    { name: 'phone', label: 'Telefoonnummer', type: 'text', defaultValue: '06 12 34 56 78' },
    { name: 'location', label: 'Locatie', type: 'text', defaultValue: 'Op afspraak - Nederland' },
    { name: 'appointmentUrl', label: 'Afspraak knop link', type: 'text', defaultValue: '/contact' },
    { name: 'instagram', label: 'Instagram link', type: 'text' },
    { name: 'linkedin', label: 'LinkedIn link', type: 'text' },
    { name: 'footerText', label: 'Footer tekst', type: 'textarea', defaultValue: 'Een warme praktijk voor holistische therapie, heling en bewustwording. Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.' },
    { name: 'copyright', label: 'Copyright tekst', type: 'text', defaultValue: 'Kathara Nova - Heling & Bewustwording' },
    { name: 'kvkText', label: 'KvK tekst', type: 'text', defaultValue: 'KvK 00000000' },
    {
      name: 'footerLinks',
      label: 'Footer links onderaan',
      type: 'array',
      labels: { singular: 'Footer link', plural: 'Footer links' },
      admin: { description: 'Bijvoorbeeld Algemene voorwaarden en Privacy. Vul een interne URL zoals /privacy of een volledige https:// link in.' },
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'Link', type: 'text', required: true }
      ],
      defaultValue: [
        { label: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
        { label: 'Privacy', href: '/privacy' }
      ]
    }
  ]
}
