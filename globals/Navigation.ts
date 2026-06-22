import type { GlobalConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigatie',
  admin: { group: 'Instellingen' },
  access: { read: () => true, update: admins },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }]
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Plan een afspraak' },
    { name: 'ctaHref', type: 'text', defaultValue: '/contact' }
  ]
}
