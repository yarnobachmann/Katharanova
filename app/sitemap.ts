import type { MetadataRoute } from 'next'

import { getBlogPosts, getTreatments } from '@/lib/cms'
import { serverUrl } from '@/lib/env'

const staticRoutes = [
  '/',
  '/over-mij',
  '/fotogallerij',
  '/workshops',
  '/blog',
  '/holistische-therapie-schoonoord',
  '/trance-healing-drenthe',
  '/systeemopstelling-drenthe',
  '/tarieven',
  '/contact',
  '/algemene-voorwaarden',
  '/privacy'
]

const treatmentRoute = (slug: string) => {
  if (slug === 'innerlijk' || slug === 'innerlijk-werk') return '/innerlijk-werk'
  if (slug === 'transhealing') return '/transhealing'
  return `/${slug}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treatments, posts] = await Promise.all([getTreatments(), getBlogPosts()])

  const staticEntries = staticRoutes.map((route) => ({
    url: `${serverUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8
  }))

  const treatmentEntries = treatments.map((treatment) => ({
    url: `${serverUrl}${treatmentRoute(treatment.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85
  }))

  const postEntries = posts.map((post) => ({
    url: `${serverUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.75 : 0.65
  }))

  return [...staticEntries, ...treatmentEntries, ...postEntries]
}
