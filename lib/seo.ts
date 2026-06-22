import type { Metadata } from 'next'

import { serverUrl } from './env'

type MetadataInput = {
  description?: string
  image?: string
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

export function createMetadata({
  description = defaultDescription,
  image = '/assets/logo-phoenix-mark.png',
  path = '/',
  title = defaultTitle
}: MetadataInput = {}): Metadata {
  const canonical = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

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

