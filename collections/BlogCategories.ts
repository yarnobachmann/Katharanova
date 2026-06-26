import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'
import { slugField } from '@/lib/payload/slugField'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: {
    singular: 'Blogcategorie',
    plural: 'Blogcategorieen'
  },
  admin: {
    group: 'Website content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order']
  },
  access: { read: () => true, create: admins, update: admins, delete: admins },
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    slugField(),
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 }
  ]
}
