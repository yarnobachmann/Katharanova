import type { GeneratePreviewURL, LivePreviewConfig } from 'payload'

import { serverUrl } from '../env'

const globalRoutes: Record<string, string> = {
  homepage: '/',
  'gallery-page': '/fotogallerij',
  'location-page': '/locatie',
  'about-page': '/over-mij',
  'workshops-page': '/workshops',
  'blog-page': '/blog',
  'tarieven-page': '/tarieven',
  'contact-page': '/contact',
  'terms-page': '/algemene-voorwaarden',
  'privacy-page': '/privacy'
}

const treatmentRoutes: Record<string, string> = {
  innerlijk: '/innerlijke-werk',
  'innerlijk-werk': '/innerlijke-werk',
  'innerlijke-werk': '/innerlijke-werk',
  opstelling: '/opstelling',
  transhealing: '/transheling',
  transheling: '/transheling'
}

const withSiteURL = (path: string) => `${serverUrl}${path}`

export function getPreviewPath(args: {
  collectionSlug?: string
  data?: Record<string, unknown>
  globalSlug?: string
}) {
  const { collectionSlug, data, globalSlug } = args
  const slug = typeof data?.slug === 'string' ? data.slug : ''

  if (globalSlug) {
    return globalRoutes[globalSlug] || '/'
  }

  if (collectionSlug === 'blog-posts') {
    return slug ? `/blog/${slug}` : '/blog'
  }

  if (collectionSlug === 'treatments') {
    return treatmentRoutes[slug] || (slug ? `/${slug}` : '/')
  }

  if (collectionSlug === 'workshops') {
    return slug ? `/workshops/${slug}` : '/workshops'
  }

  if (collectionSlug === 'seo-landing-pages') {
    return slug ? `/${slug}` : '/'
  }

  if (collectionSlug === 'gallery-photos') {
    return '/fotogallerij'
  }

  return '/'
}

export const livePreview: LivePreviewConfig = {
  breakpoints: [
    { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
    { label: 'Mobile', name: 'mobile', width: 390, height: 844 }
  ],
  url: ({ collectionConfig, data, globalConfig }) =>
    withSiteURL(getPreviewPath({
      collectionSlug: collectionConfig?.slug,
      data,
      globalSlug: globalConfig?.slug
    }))
}

export const previewForCollection =
  (collectionSlug: string): GeneratePreviewURL =>
  (doc) =>
    withSiteURL(getPreviewPath({ collectionSlug, data: doc }))

export const previewForGlobal =
  (globalSlug: string): GeneratePreviewURL =>
  () =>
    withSiteURL(getPreviewPath({ globalSlug }))
