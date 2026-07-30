import type { CollectionConfig } from 'payload'

import { admins, publishedOrAdmin } from '@/lib/payload/access'
import { ensureUniqueMediaValue } from '@/lib/payload/mediaUsage'
import { previewForCollection } from '@/lib/payload/preview'
import { slugField } from '@/lib/payload/slugField'
import { collectionVersions } from '@/lib/payload/versions'

export const Workshops: CollectionConfig = {
  slug: 'workshops',
  labels: {
    singular: 'Workshop',
    plural: 'Workshops'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'dateLabel', 'featured', 'active', '_status'],
    livePreview: {},
    preview: previewForCollection('workshops')
  },
  versions: collectionVersions,
  access: { read: publishedOrAdmin, create: admins, update: admins, delete: admins },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        await ensureUniqueMediaValue({ collection: 'workshops', data, fieldLabel: 'deze workshop', id: originalDoc?.id, paths: ['image'], req })
        return data
      }
    ]
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'date', type: 'date', admin: { description: 'Laat leeg voor workshops op aanvraag of prive-workshops.' } },
    { name: 'dateLabel', label: 'Datum label', type: 'text', admin: { description: 'Tekst die wordt getoond als er geen datum is, bijvoorbeeld Op aanvraag of Boek met een vriend(in).' } },
    { name: 'startTime', type: 'text' },
    { name: 'endTime', type: 'text' },
    { name: 'location', type: 'text', required: true },
    { name: 'durationLabel', type: 'text', required: true },
    { name: 'spotsLabel', type: 'text', required: true },
    { name: 'price', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'image', label: 'Afbeelding', type: 'upload', relationTo: 'media', admin: { description: 'Kies of upload een afbeelding. Vervang geen bestaand media-item als die ook ergens anders wordt gebruikt.' } },
    { name: 'tone', type: 'select', options: ['cream', 'sage', 'clay', 'sand', 'dark'], defaultValue: 'cream' },
    { name: 'content', type: 'richText' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'seo', type: 'group', fields: [{ name: 'metaTitle', type: 'text' }, { name: 'metaDescription', type: 'textarea' }] }
  ]
}

