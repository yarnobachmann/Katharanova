import type { CollectionConfig } from 'payload'

import { admins, publishedOrAdmin } from '@/lib/payload/access'
import { previewForCollection } from '@/lib/payload/preview'

export const Workshops: CollectionConfig = {
  slug: 'workshops',
  labels: {
    singular: 'Workshop',
    plural: 'Workshops'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'featured', 'active', '_status'],
    livePreview: {},
    preview: previewForCollection('workshops')
  },
  versions: { drafts: true },
  access: { read: publishedOrAdmin, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'date', type: 'date', required: true },
    { name: 'startTime', type: 'text' },
    { name: 'endTime', type: 'text' },
    { name: 'location', type: 'text', required: true },
    { name: 'durationLabel', type: 'text', required: true },
    { name: 'spotsLabel', type: 'text', required: true },
    { name: 'price', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'tone', type: 'select', options: ['cream', 'sage', 'clay', 'sand', 'dark'], defaultValue: 'cream' },
    { name: 'content', type: 'richText' },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'seo', type: 'group', fields: [{ name: 'metaTitle', type: 'text' }, { name: 'metaDescription', type: 'textarea' }] }
  ]
}
