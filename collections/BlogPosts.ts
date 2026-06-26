import type { CollectionConfig } from 'payload'

import { admins, publishedOrAdmin } from '@/lib/payload/access'
import { previewForCollection } from '@/lib/payload/preview'
import { slugField } from '@/lib/payload/slugField'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Blogbericht',
    plural: 'Blogberichten'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', 'featured', '_status'],
    livePreview: {},
    preview: previewForCollection('blog-posts')
  },
  versions: { drafts: true },
  access: { read: publishedOrAdmin, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    slugField(),
    {
      name: 'categories',
      label: 'Categorieen',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      admin: {
        description: 'Kies een of meerdere categorieen voor dit blogbericht.'
      }
    },
    {
      name: 'category',
      label: 'Oude categorie',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Alleen bewaard als fallback voor oude seed content.'
      }
    },
    { name: 'excerpt', label: 'Korte samenvatting', type: 'textarea', required: true },
    { name: 'publishedAt', label: 'Publicatiedatum', type: 'date', required: true },
    { name: 'readTime', label: 'Leestijd', type: 'text', required: true },
    { name: 'image', label: 'Afbeelding', type: 'upload', relationTo: 'media' },
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
    { name: 'featured', label: 'Uitgelicht', type: 'checkbox', defaultValue: false },
    { name: 'content', label: 'Inhoud', type: 'richText', required: true },
    { name: 'seo', label: 'SEO', type: 'group', fields: [{ name: 'metaTitle', label: 'Meta titel', type: 'text' }, { name: 'metaDescription', label: 'Meta omschrijving', type: 'textarea' }] }
  ]
}
