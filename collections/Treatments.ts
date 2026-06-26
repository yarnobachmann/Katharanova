import type { CollectionConfig } from 'payload'

import { admins, publishedOrAdmin } from '@/lib/payload/access'
import { previewForCollection } from '@/lib/payload/preview'
import { slugField } from '@/lib/payload/slugField'

const toneOptions = ['cream', 'sage', 'clay', 'sand']
const iconOptions = [
  { label: 'Sterretjes', value: 'sparkles' },
  { label: 'Opstelling', value: 'git-fork' },
  { label: 'Hart handen', value: 'heart-handshake' },
  { label: 'Hart', value: 'heart' },
  { label: 'Schild', value: 'shield' }
]

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  labels: {
    singular: 'Behandelpagina',
    plural: 'Behandelpagina\'s'
  },
  admin: {
    group: 'Pagina content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'navLabel', 'order', '_status'],
    livePreview: {},
    preview: previewForCollection('treatments'),
    description: 'Deze pagina\'s verschijnen automatisch in de dropdown "Behandelingen" zodra ze gepubliceerd zijn. Gebruik "Navigatie" alleen voor vaste navbar-links.'
  },
  versions: { drafts: true },
  access: { read: publishedOrAdmin, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', label: 'Paginatitel', type: 'text', required: true },
    slugField({ description: 'Bijvoorbeeld: transheling. Spaties worden automatisch streepjes.' }),
    { name: 'navLabel', label: 'Label in navigatie', type: 'text', required: true },
    { name: 'eyebrow', label: 'Label boven titel', type: 'text' },
    { name: 'summary', label: 'Korte samenvatting', type: 'textarea', required: true, admin: { description: 'Korte tekst voor kaarten en zoekmachines.' } },
    { name: 'intro', label: 'Introductietekst', type: 'textarea', required: true },
    { name: 'mainImage', label: 'Hoofdafbeelding', type: 'upload', relationTo: 'media' },
    { name: 'icon', label: 'Icoon', type: 'select', options: iconOptions, defaultValue: 'sparkles' },
    { name: 'tone', label: 'Kleurstijl', type: 'select', options: toneOptions, defaultValue: 'cream', required: true },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0, required: true },
    { name: 'whatTitle', label: 'Titel: wat is het?', type: 'text', required: true },
    { name: 'whatBody', label: 'Tekst: wat is het?', type: 'richText', required: true },
    { name: 'forWhoTitle', label: 'Titel: voor wie', type: 'text', defaultValue: 'Voor wie is het bedoeld?' },
    { name: 'forWho', label: 'Voor wie punten', type: 'array', labels: { singular: 'Punt', plural: 'Punten' }, fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }] },
    { name: 'sessionTitle', label: 'Titel: sessie verloop', type: 'text', defaultValue: 'Wat kun je verwachten tijdens een sessie?' },
    { name: 'sessionSteps', label: 'Stappen tijdens een sessie', type: 'array', labels: { singular: 'Stap', plural: 'Stappen' }, fields: [{ name: 'title', label: 'Titel', type: 'text', required: true }, { name: 'description', label: 'Omschrijving', type: 'textarea', required: true }] },
    { name: 'outcomesTitle', label: 'Titel: mogelijke effecten', type: 'text', defaultValue: 'Mogelijke effecten' },
    { name: 'outcomes', label: 'Mogelijke effecten', type: 'array', labels: { singular: 'Effect', plural: 'Effecten' }, fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }] },
    { name: 'ctaTitle', label: 'CTA titel', type: 'text', defaultValue: 'Klaar voor een eerste stap?' },
    { name: 'ctaText', label: 'CTA tekst', type: 'textarea', defaultValue: 'Stel vrijblijvend je vraag of plan een sessie. Ik denk graag met je mee.' },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [{ name: 'metaTitle', label: 'SEO titel', type: 'text' }, { name: 'metaDescription', label: 'SEO omschrijving', type: 'textarea' }]
    }
  ]
}
