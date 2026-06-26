'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { normalizeSlug } from '@/lib/slug'

import './admin-theme.css'

export function AdminTheme({ children }: { children: ReactNode }) {
  useEffect(() => {
    const normalizeSlugInput = (event: Event) => {
      const input = event.target

      if (!(input instanceof HTMLInputElement)) return
      if (input.name !== 'slug' && !input.name.endsWith('.slug')) return

      const normalized = normalizeSlug(input.value)
      if (input.value !== normalized) {
        input.value = normalized
      }
    }

    const cleanupEmptyModalContainers = () => {
      document.querySelectorAll<HTMLElement>('.payload__modal-container').forEach((container) => {
        const hasActiveModal = Boolean(
          container.querySelector(
            [
              '[role="dialog"]',
              '[aria-modal="true"]',
              '.modal',
              '.drawer',
              '.upload-drawer',
              '.relationship-popup',
              '.payload__modal'
            ].join(',')
          )
        )

        container.dataset.emptyModalLayer = hasActiveModal ? 'false' : 'true'
      })
    }

    cleanupEmptyModalContainers()
    const observer = new MutationObserver(cleanupEmptyModalContainers)
    document.addEventListener('input', normalizeSlugInput, true)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })

    return () => {
      document.removeEventListener('input', normalizeSlugInput, true)
      observer.disconnect()
    }
  }, [])

  return children
}
