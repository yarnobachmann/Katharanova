import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/payload/access'
import { findMediaUsages, mediaUsageCount } from '@/lib/payload/mediaUsage'

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
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const uploadedFile = (req as any).file
        if (operation !== 'update' || !uploadedFile || !originalDoc?.id) return data

        const usages = await findMediaUsages(req.payload, originalDoc.id)
        if (mediaUsageCount(usages) <= 1) return data

        throw new Error('Deze afbeelding wordt op meerdere plekken gebruikt. Upload een nieuwe afbeelding in plaats van dit media-item te vervangen.')
      }
    ]
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
