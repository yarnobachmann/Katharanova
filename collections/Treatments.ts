import type { CollectionConfig } from 'payload'

import { admins, publishedOrAdmin } from '@/lib/payload/access'
import { previewForCollection } from '@/lib/payload/preview'

const toneOptions = ['cream', 'sage', 'clay', 'sand', 'dark']

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  labels: {
    singular: 'Behandeling',
    plural: 'Behandelingen'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', '_status'],
    livePreview: {},
    preview: previewForCollection('treatments')
  },
  versions: { drafts: true },
  access: { read: publishedOrAdmin, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'navLabel', type: 'text', required: true },
    { name: 'eyebrow', type: 'text' },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'intro', type: 'textarea', required: true },
    { name: 'mainImage', type: 'upload', relationTo: 'media' },
    { name: 'icon', type: 'text', defaultValue: 'sparkles' },
    { name: 'tone', type: 'select', options: toneOptions, defaultValue: 'cream', required: true },
    { name: 'order', type: 'number', defaultValue: 0, required: true },
    { name: 'whatTitle', type: 'text', required: true },
    { name: 'whatBody', type: 'richText', required: true },
    { name: 'forWhoTitle', type: 'text', defaultValue: 'Voor wie is het bedoeld?' },
    { name: 'forWho', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'sessionTitle', type: 'text', defaultValue: 'Wat kun je verwachten tijdens een sessie?' },
    { name: 'sessionSteps', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea', required: true }] },
    { name: 'outcomesTitle', type: 'text', defaultValue: 'Mogelijke effecten' },
    { name: 'outcomes', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'ctaTitle', type: 'text', defaultValue: 'Klaar voor een eerste stap?' },
    { name: 'ctaText', type: 'textarea', defaultValue: 'Stel vrijblijvend je vraag of plan een sessie. Ik denk graag met je mee.' },
    {
      name: 'seo',
      type: 'group',
      fields: [{ name: 'metaTitle', type: 'text' }, { name: 'metaDescription', type: 'textarea' }]
    }
  ]
}
