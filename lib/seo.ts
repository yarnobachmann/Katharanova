import type { Metadata } from 'next'

import { serverUrl } from './env'
import type { MediaSource } from './types'

type MetadataInput = {
  description?: string
  image?: MediaSource
  path?: string
  title?: string
}

const siteName = 'Kathara Nova'
const defaultDescription = 'Een warme praktijk voor holistische therapie, heling en bewustwording.'
const defaultTitle = 'Kathara Nova - Holistische therapie, heling & bewustwording'

const absoluteUrl = (path = '/') => {
  if (path.startsWith('http')) return path
  return `${serverUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const mediaSourceUrl = (image: MediaSource) =>
  typeof image === 'string' ? image : image.src || image.url || '/assets/logo-phoenix-mark.png'

export function createMetadata({
  description = defaultDescription,
  image = '/assets/logo-phoenix-mark.png',
  path = '/',
  title = defaultTitle
}: MetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = absoluteUrl(mediaSourceUrl(image))

  return {
    metadataBase: new URL(serverUrl),
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: 'nl_NL',
      type: 'website',
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  }
}

export function pageTitle(title: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`
}
