import type { TextField } from 'payload'

import { normalizeSlug } from '@/lib/slug'

type SlugFieldOptions = {
  label?: string
  description?: string
}

export function slugField(options: SlugFieldOptions = {}): TextField {
  return {
    name: 'slug',
    label: options.label ?? 'URL-slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      description: options.description ?? 'Gebruik kleine letters en streepjes. Spaties worden automatisch streepjes.'
    },
    hooks: {
      beforeValidate: [
        ({ value }) => normalizeSlug(value)
      ]
    }
  }
}
