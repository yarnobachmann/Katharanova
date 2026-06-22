import type { GlobalConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigatie',
  admin: {
    group: 'Instellingen',
    description: 'Beheer hier de vaste navbar-links en CTA. De dropdown “Behandelingen” wordt automatisch gevuld met gepubliceerde Behandelpagina’s.'
  },
  access: { read: () => true, update: admins },
  fields: [
    {
      name: 'navItems',
      label: 'Vaste navigatie links',
      type: 'array',
      admin: {
        description: 'Gebruik dit voor Home, Over mij, Workshops, Blog, Tarieven en Contact. Voeg behandelingen toe via Pagina content > Behandelpagina’s.'
      },
      fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }]
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Plan een afspraak' },
    { name: 'ctaHref', type: 'text', defaultValue: '/contact' }
  ]
}
