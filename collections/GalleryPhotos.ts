import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const GalleryPhotos: CollectionConfig = {
  slug: 'gallery-photos',
  labels: {
    singular: 'Foto',
    plural: 'Foto\'s'
  },
  admin: {
    group: 'Pagina content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'active', 'order']
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins
  },
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    { name: 'image', label: 'Afbeelding', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', label: 'Bijschrift', type: 'text' },
    { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 },
    { name: 'active', label: 'Zichtbaar', type: 'checkbox', defaultValue: true }
  ]
}
