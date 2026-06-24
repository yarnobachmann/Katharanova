import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const PricingItems: CollectionConfig = {
  slug: 'pricing-items',
  labels: {
    singular: 'Tarief',
    plural: 'Tarieven'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'featured', 'order'],
    description: 'Deze items vormen de prijskaarten op de pagina Tarieven.'
  },
  access: { read: () => true, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    { name: 'price', label: 'Prijs', type: 'text', required: true },
    { name: 'description', label: 'Omschrijving', type: 'textarea', required: true },
    { name: 'features', label: 'Punten', type: 'array', fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }] },
    { name: 'ctaLabel', label: 'Knoptekst', type: 'text', required: true },
    { name: 'ctaHref', label: 'Knoplink', type: 'text', defaultValue: '/contact' },
    { name: 'featured', label: 'Meest gekozen', type: 'checkbox', defaultValue: false },
    {
      name: 'tone',
      label: 'Kaartkleur',
      type: 'select',
      options: [
        { label: 'Creme', value: 'cream' },
        { label: 'Salie', value: 'sage' },
        { label: 'Klei', value: 'clay' },
        { label: 'Zand', value: 'sand' }
      ],
      defaultValue: 'cream'
    },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0, required: true }
  ]
}
