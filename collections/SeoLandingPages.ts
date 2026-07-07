import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'
import { previewForCollection } from '@/lib/payload/preview'
import { slugField } from '@/lib/payload/slugField'

export const SeoLandingPages: CollectionConfig = {
  slug: 'seo-landing-pages',
  labels: {
    singular: 'SEO landingspagina',
    plural: 'SEO landingspagina\'s'
  },
  admin: {
    group: 'Pagina content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {},
    preview: previewForCollection('seo-landing-pages'),
    description: 'Lokale SEO-pagina\'s zoals holistische therapie Schoonoord, trance-healing Drenthe en systeemopstelling Drenthe.'
  },
  access: { read: () => true, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', label: 'Paginatitel', type: 'text', required: true },
    slugField({ description: 'Bijvoorbeeld: holistische-therapie-schoonoord. Deze pagina komt op /jouw-slug.' }),
    { name: 'eyebrow', label: 'Label boven titel', type: 'text', required: true },
    { name: 'intro', label: 'Introductietekst', type: 'textarea', required: true },
    {
      name: 'sections',
      label: 'Inhoudsblokken',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Blok', plural: 'Blokken' },
      fields: [
        { name: 'title', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Tekst', type: 'textarea', required: true }
      ]
    },
    {
      name: 'highlights',
      label: 'Highlights in zijkolom',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Highlight', plural: 'Highlights' },
      fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }]
    },
    {
      name: 'relatedLinks',
      label: 'Gerelateerde links',
      type: 'array',
      labels: { singular: 'Link', plural: 'Links' },
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'URL', type: 'text', required: true }
      ]
    },
    { name: 'ctaTitle', label: 'CTA titel zijkolom', type: 'text', defaultValue: 'Kathara Nova in Schoonoord' },
    { name: 'ctaText', label: 'CTA tekst zijkolom', type: 'textarea', defaultValue: 'Op afspraak in Schoonoord, met begeleiding voor mensen uit Drenthe en omgeving.' },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'metaTitle', label: 'SEO titel', type: 'text' },
        { name: 'metaDescription', label: 'SEO omschrijving', type: 'textarea' }
      ]
    }
  ]
}
