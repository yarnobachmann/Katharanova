import type { GlobalConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site instellingen',
  admin: { group: 'Instellingen' },
  access: { read: () => true, update: admins },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Kathara Nova', required: true },
    { name: 'siteTitle', type: 'text', defaultValue: 'Kathara Nova - Holistische therapie, heling & bewustwording' },
    { name: 'siteDescription', type: 'textarea', defaultValue: 'Een warme praktijk voor holistische therapie, heling en bewustwording.' },
    { name: 'logoMark', type: 'upload', relationTo: 'media' },
    { name: 'logoFull', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'email', defaultValue: 'hallo@katharanova.nl' },
    { name: 'phone', type: 'text', defaultValue: '06 12 34 56 78' },
    { name: 'location', type: 'text', defaultValue: 'Op afspraak · Nederland' },
    { name: 'appointmentUrl', type: 'text', defaultValue: '/contact' },
    { name: 'instagram', type: 'text' },
    { name: 'linkedin', type: 'text' },
    { name: 'footerText', type: 'textarea', defaultValue: 'Een warme praktijk voor holistische therapie, heling en bewustwording. Niet wat je overkomt, maar hoe je ermee omgaat bepaalt of je lijdt of niet.' },
    { name: 'copyright', type: 'text', defaultValue: 'Kathara Nova · Heling & Bewustwording' }
  ]
}
