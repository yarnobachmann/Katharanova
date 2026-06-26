import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Vraag',
    plural: 'Veelgestelde vragen'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'pageContext', 'order'],
    description: 'Deze vragen worden onder "Goed om te weten" op de Tarieven pagina getoond. Voeg hier nieuwe FAQ-items toe.'
  },
  access: { read: () => true, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'question', label: 'Vraag', type: 'text', required: true },
    { name: 'answer', label: 'Antwoord', type: 'textarea', required: true },
    {
      name: 'pageContext',
      label: 'Pagina',
      type: 'select',
      defaultValue: 'tarieven',
      options: [{ label: 'Tarieven', value: 'tarieven' }]
    },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 }
  ]
}
