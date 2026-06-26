'use client'

import { TextInput, useField } from '@payloadcms/ui'
import type { ChangeEvent } from 'react'

import { normalizeSlug } from '@/lib/slug'

type SlugTextFieldProps = {
  field: {
    admin?: {
      description?: string
      placeholder?: string
      readOnly?: boolean
    }
    label?: string
    required?: boolean
  }
  path: string
}

export function SlugTextField({ field, path }: SlugTextFieldProps) {
  const { setValue, showError, value } = useField<string>({ path })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(normalizeSlug(event.target.value))
  }

  return (
    <TextInput
      description={field.admin?.description}
      label={field.label}
      onChange={handleChange}
      path={path}
      placeholder={field.admin?.placeholder}
      readOnly={field.admin?.readOnly}
      required={field.required}
      showError={showError}
      value={typeof value === 'string' ? value : ''}
    />
  )
}
