'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

import './admin-theme.css'

export function AdminTheme({ children }: { children: ReactNode }) {
  useEffect(() => {
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
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })

    return () => observer.disconnect()
  }, [])

  return children
}
