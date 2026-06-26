import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media'
  },
  admin: {
    group: 'Bibliotheek'
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins
  },
  upload: {
    staticDir: 'media',
    focalPoint: true,
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as any
      return (sizes?.thumbnail?.url || doc.thumbnailURL || doc.url) as string
    },
    imageSizes: [
      { name: 'thumbnail', width: 420, height: 280, position: 'centre' },
      { name: 'card', width: 900, height: 640, position: 'centre' },
      { name: 'large', width: 1600, height: 1100, position: 'centre' }
    ]
  },
  fields: [
    { name: 'alt', label: 'Alt tekst', type: 'text', required: true },
    { name: 'caption', label: 'Bijschrift', type: 'text' }
  ]
}
