import type { Metadata } from 'next'

import { serverUrl } from './env'
import type { MediaSource, SiteSettings } from './types'

type MetadataInput = {
  description?: string
  image?: MediaSource
  path?: string
  title?: string
}

const siteName = 'Kathara Nova'
const defaultDescription = 'Holistische therapie, transheling, opstellingen en bewustwording in Schoonoord, Drenthe.'
const defaultTitle = 'Holistische therapie in Schoonoord | Kathara Nova'

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
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' }
      ],
      apple: [
        { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
      ]
    },
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

export function createBusinessSchema(settings: SiteSettings) {
  const sameAs = [settings.instagram, settings.linkedin].filter((url): url is string => Boolean(url))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthAndBeautyBusiness',
        '@id': `${serverUrl}/#business`,
        name: settings.siteName || siteName,
        url: `${serverUrl}/`,
        image: absoluteUrl(settings.logoMark || '/assets/logo-phoenix-mark.png'),
        logo: absoluteUrl(settings.logoFull || settings.logoMark || '/assets/logo-phoenix-full.png'),
        description: settings.siteDescription || defaultDescription,
        email: settings.email,
        telephone: settings.phone,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Schoonoord',
          addressRegion: 'Drenthe',
          addressCountry: 'NL'
        },
        areaServed: ['Schoonoord', 'Drenthe', 'Coevorden', 'Emmen'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        ],
        sameAs
      },
      {
        '@type': 'WebSite',
        '@id': `${serverUrl}/#website`,
        name: settings.siteName || siteName,
        url: `${serverUrl}/`,
        publisher: { '@id': `${serverUrl}/#business` },
        inLanguage: 'nl-NL'
      }
    ]
  }
}

export function createHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${serverUrl}/#home`,
    url: `${serverUrl}/`,
    name: 'Holistische therapie in Schoonoord | Kathara Nova',
    description: defaultDescription,
    inLanguage: 'nl-NL',
    isPartOf: { '@id': `${serverUrl}/#website` },
    about: { '@id': `${serverUrl}/#business` },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Begeleiding bij Kathara Nova',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: `${serverUrl}/`,
          name: 'Holistische therapie in Schoonoord'
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: `${serverUrl}/transheling`,
          name: 'Transheling in Drenthe'
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: `${serverUrl}/opstelling`,
          name: 'Systeemopstelling in Drenthe'
        }
      ]
    }
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
