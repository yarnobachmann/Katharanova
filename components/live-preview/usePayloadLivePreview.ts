'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type LivePreviewMessage = {
  type?: string
  collectionSlug?: string
  data?: Record<string, any>
  globalSlug?: string
}

export function usePayloadLivePreview<T>({
  collectionSlug,
  globalSlug,
  initialData,
  normalize,
  previewFetchPath
}: {
  collectionSlug?: string
  globalSlug?: string
  initialData: T
  normalize: (initialData: T, data: Record<string, any>) => T
  previewFetchPath?: string
}) {
  const router = useRouter()
  const [previewData, setPreviewData] = useState(initialData)

  useEffect(() => {
    setPreviewData(initialData)
  }, [initialData])

  useEffect(() => {
    const readyMessage = { type: 'payload-live-preview', ready: true }

    const refreshFromAPI = async () => {
      if (!previewFetchPath || window.parent === window) return

      try {
        const response = await fetch(previewFetchPath, {
          cache: 'no-store',
          credentials: 'include'
        })
        if (!response.ok) return

        const data = await resolveUploadFields(await response.json())
        setPreviewData(normalize(initialData, data))
      } catch {
        // Live preview postMessage remains the primary update path.
      }
    }

    window.parent?.postMessage(readyMessage, '*')
    window.opener?.postMessage(readyMessage, '*')
    void refreshFromAPI()

    const handleMessage = async (event: MessageEvent<LivePreviewMessage>) => {
      if (!event.data || typeof event.data !== 'object') return

      if (event.data.type === 'payload-document-event') {
        void refreshFromAPI()
        router.refresh()
        return
      }

      if (event.data.type !== 'payload-live-preview' || !event.data.data) return
      if (collectionSlug && event.data.collectionSlug !== collectionSlug) return
      if (globalSlug && event.data.globalSlug !== globalSlug) return

      const data = await resolveUploadFields(event.data.data)
      setPreviewData(normalize(initialData, data))
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [collectionSlug, globalSlug, initialData, normalize, previewFetchPath, router])

  return previewData
}

const uploadFieldNames = new Set(['aboutImage', 'heroImage', 'image', 'logoFull', 'logoMark', 'mainImage', 'portrait'])
const mediaCache = new Map<string, Promise<Record<string, any> | undefined>>()

async function resolveUploadFields(value: any, key?: string): Promise<any> {
  if (!value || typeof value !== 'object') return value

  if (key && uploadFieldNames.has(key)) {
    return resolveMediaValue(value)
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => resolveUploadFields(item)))
  }

  const entries = await Promise.all(
    Object.entries(value).map(async ([entryKey, entryValue]) => [entryKey, await resolveUploadFields(entryValue, entryKey)] as const)
  )

  return Object.fromEntries(entries)
}

async function resolveMediaValue(value: any) {
  if (!value) return value
  if (typeof value === 'object' && (value.url || value.thumbnailURL || value.sizes)) return value

  const id =
    typeof value === 'number' || typeof value === 'string'
      ? value
      : typeof value?.id === 'number' || typeof value?.id === 'string'
        ? value.id
      : typeof value?.value === 'number' || typeof value?.value === 'string'
        ? value.value
        : typeof value?.value?.id === 'number' || typeof value?.value?.id === 'string'
          ? value.value.id
        : typeof value?.doc?.id === 'number' || typeof value?.doc?.id === 'string'
          ? value.doc.id
        : undefined

  if (!id) return value

  const cacheKey = String(id)
  if (!mediaCache.has(cacheKey)) {
    mediaCache.set(cacheKey, fetch(`/api/media/${encodeURIComponent(cacheKey)}?depth=2`, {
      cache: 'no-store',
      credentials: 'include'
    })
      .then((response) => response.ok ? response.json() : undefined)
      .catch(() => undefined))
  }

  const media = await mediaCache.get(cacheKey)
  if (!media) mediaCache.delete(cacheKey)
  return media || value
}
