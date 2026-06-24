import { unstable_noStore as noStore } from 'next/cache'

import { getPayloadClient } from './payload/client'
import {
  aboutPage,
  blogPage,
  blogPosts,
  contactPage,
  faqs,
  home,
  navigation,
  pricingItems,
  siteSettings,
  tarievenPage,
  treatments,
  workshops,
  workshopsPage
} from './seed-data'
import type { BlogPost, FAQ, Navigation, PricingItem, SiteSettings, Treatment, Workshop } from './types'

const toLocalMediaPath = (url: string): string => {
  try {
    const parsed = new URL(url)
    const configuredHost = process.env.NEXT_PUBLIC_SERVER_URL
      ? new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname
      : undefined
    const isLocalHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
    const isConfiguredHost = configuredHost && parsed.hostname === configuredHost
    const isKatharaHost = parsed.hostname === 'katharanova.nl' || parsed.hostname === 'www.katharanova.nl'
    const isPayloadMedia = parsed.pathname.startsWith('/media/') || parsed.pathname.startsWith('/api/media/')

    if ((isLocalHost || isConfiguredHost || isKatharaHost) && isPayloadMedia) {
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    return url
  }

  return url
}

const mediaUrl = (value: any, fallback = ''): string => {
  if (!value) return fallback
  if (typeof value === 'string') return value
  const url =
    value.sizes?.large?.url ||
    value.sizes?.card?.url ||
    value.sizes?.thumbnail?.url ||
    value.thumbnailURL ||
    value.url ||
    fallback

  return typeof url === 'string' ? toLocalMediaPath(url) : fallback
}

const arrayLabels = (value: any): string[] =>
  Array.isArray(value)
    ? value
      .map((item) => typeof item === 'string' ? item : item?.label)
      .filter((label): label is string => typeof label === 'string' && label.trim().length > 0)
    : []

const sortByOrder = <T extends { order?: number }>(items: T[] = []): T[] =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

const methodStepsFallback = [
  { title: 'Veiligheid', description: 'Eerst rust en vertrouwen - zonder druk.', order: 1 },
  { title: 'Verdieping', description: 'Samen kijken naar wat er werkelijk speelt.', order: 2 },
  { title: 'Integratie', description: 'Inzichten een plek geven in je dagelijks leven.', order: 3 }
]

const categoryLabels = (value: any, fallback?: string): string[] => {
  const labels = Array.isArray(value)
    ? value.map((item) => typeof item === 'string' ? item : item?.title || item?.label).filter(Boolean)
    : []
  return labels.length ? labels : fallback ? [fallback] : []
}

const mergeGroup = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {})
})

const mergeHero = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {}),
  image: mediaUrl(value?.image, fallback.image)
})

const richTextToPlain = (value: any, fallback = ''): string => {
  if (typeof value === 'string') return value
  const parts: string[] = []
  const walk = (node: any) => {
    if (!node) return
    if (typeof node.text === 'string') parts.push(node.text)
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }
  walk(value?.root || value)
  return parts.join(' ').trim() || fallback
}

async function withPayload<T>(query: (payload: Awaited<ReturnType<typeof getPayloadClient>>) => Promise<T>, fallback: T): Promise<T> {
  noStore()
  if (!process.env.DATABASE_URI) return fallback
  try {
    const payload = await getPayloadClient()
    return await query(payload)
  } catch {
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'site-settings' })
    return {
      ...siteSettings,
      ...data,
      logoMark: mediaUrl(data.logoMark, siteSettings.logoMark),
      logoFull: mediaUrl(data.logoFull, siteSettings.logoFull)
    }
  }, siteSettings)
}

export async function getNavigation(): Promise<Navigation> {
  return withPayload(async (payload) => {
    const [data, treatmentResult]: any[] = await Promise.all([
      payload.findGlobal({ slug: 'navigation' }),
      payload.find({ collection: 'treatments', sort: 'order', limit: 20, depth: 0 })
    ])
    const treatmentItems = treatmentResult.docs.map((doc: any) => ({
      label: doc.navLabel || doc.title,
      href: `/${doc.slug}`
    }))

    return {
      navItems: data.navItems?.length ? data.navItems : navigation.navItems,
      treatmentItems: treatmentItems.length ? treatmentItems : navigation.treatmentItems,
      ctaLabel: data.ctaLabel || navigation.ctaLabel,
      ctaHref: data.ctaHref || navigation.ctaHref
    }
  }, navigation)
}

export async function getHomepage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'homepage' })
    return {
      ...home,
      ...data,
      hero: mergeHero(home.hero, data.hero),
      cta: mergeGroup(home.cta, data.cta),
      recognitionItems: arrayLabels(data.recognitionItems).length ? arrayLabels(data.recognitionItems) : home.recognitionItems,
      heroMetaItems: data.heroMetaItems?.length ? sortByOrder(data.heroMetaItems) : home.heroMetaItems,
      aboutImage: mediaUrl(data.aboutImage, home.aboutImage),
      galleryItems: data.galleryItems?.length
        ? sortByOrder(data.galleryItems).map((item: any) => ({
          ...item,
          image: mediaUrl(item.image)
        })).filter((item: any) => item.image)
        : home.galleryItems
    }
  }, home)
}

const normalizeGalleryItems = (items: any[] = [], fallback: any[] = []) =>
  items.length
    ? sortByOrder(items).map((item: any) => ({
      ...item,
      image: mediaUrl(item.image)
    })).filter((item: any) => item.image)
    : fallback

export async function getGalleryPage() {
  const fallback = {
    hero: {
      eyebrow: home.galleryEyebrow,
      title: home.galleryTitle,
      intro: home.galleryIntro,
      image: home.galleryItems[0]?.image
    },
    galleryEyebrow: home.galleryEyebrow,
    galleryTitle: home.galleryTitle,
    galleryIntro: home.galleryIntro,
    galleryItems: home.galleryItems
  }

  return withPayload(async (payload) => {
    const [galleryData, homepageData, photoResult]: any[] = await Promise.all([
      payload.findGlobal({ slug: 'gallery-page' }),
      payload.findGlobal({ slug: 'homepage' }),
      payload.find({
        collection: 'gallery-photos',
        sort: 'order',
        depth: 2,
        limit: 100,
        where: { active: { equals: true } }
      })
    ])
    const collectionItems = photoResult.docs?.map((doc: any) => ({
      image: mediaUrl(doc.image),
      caption: doc.caption || doc.title,
      order: doc.order
    })).filter((item: any) => item.image) || []
    const legacy = {
      hero: {
        eyebrow: homepageData?.galleryEyebrow || fallback.hero.eyebrow,
        title: homepageData?.galleryTitle || fallback.hero.title,
        intro: homepageData?.galleryIntro || fallback.hero.intro,
        image: collectionItems[0]?.image || fallback.hero.image
      },
      galleryEyebrow: homepageData?.galleryEyebrow || fallback.galleryEyebrow,
      galleryTitle: homepageData?.galleryTitle || fallback.galleryTitle,
      galleryIntro: homepageData?.galleryIntro || fallback.galleryIntro,
      galleryItems: normalizeGalleryItems(homepageData?.galleryItems, fallback.galleryItems)
    }

    return {
      ...legacy,
      ...(galleryData || {}),
      hero: mergeHero(legacy.hero, galleryData?.hero),
      galleryEyebrow: galleryData?.hero?.eyebrow || galleryData?.galleryEyebrow || legacy.galleryEyebrow,
      galleryTitle: galleryData?.hero?.title || galleryData?.galleryTitle || legacy.galleryTitle,
      galleryIntro: galleryData?.hero?.intro || galleryData?.galleryIntro || legacy.galleryIntro,
      galleryItems: collectionItems.length
        ? collectionItems
        : normalizeGalleryItems(galleryData?.galleryItems, legacy.galleryItems)
    }
  }, fallback)
}

export async function getAboutPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'about-page' })
    return {
      ...aboutPage,
      ...data,
      hero: mergeHero(aboutPage.hero, data.hero),
      cta: mergeGroup(aboutPage.cta, data.cta),
      portrait: mediaUrl(data.portrait, aboutPage.portrait),
      stats: data.stats?.length ? data.stats : aboutPage.stats,
      intro: richTextToPlain(data.intro, aboutPage.intro),
      vision: richTextToPlain(data.vision, aboutPage.vision),
      workingMethod: richTextToPlain(data.workingMethod, aboutPage.workingMethod),
      methodSteps: data.methodSteps?.length ? sortByOrder(data.methodSteps) : methodStepsFallback,
      forWho: arrayLabels(data.forWho).length ? arrayLabels(data.forWho) : aboutPage.forWho
    }
  }, aboutPage)
}

export async function getTreatments(): Promise<Treatment[]> {
  return withPayload(async (payload) => {
    const result: any = await payload.find({ collection: 'treatments', sort: 'order', depth: 2, limit: 20 })
    return result.docs.map((doc: any) => ({
      ...doc,
      image: mediaUrl(doc.mainImage, treatments.find((t) => t.slug === doc.slug)?.image),
      whatBody: richTextToPlain(doc.whatBody),
      forWho: arrayLabels(doc.forWho),
      outcomes: arrayLabels(doc.outcomes),
      sessionSteps: doc.sessionSteps || []
    }))
  }, treatments)
}

export async function getTreatment(slug: string): Promise<Treatment | undefined> {
  return (await getTreatments()).find((item) => item.slug === slug)
}

export async function getWorkshops(): Promise<Workshop[]> {
  return withPayload(async (payload) => {
    const result: any = await payload.find({ collection: 'workshops', sort: 'date', depth: 2, limit: 50, where: { active: { equals: true } } })
    return result.docs.map((doc: any) => ({
      ...doc,
      image: mediaUrl(doc.image),
      content: richTextToPlain(doc.content, doc.excerpt)
    }))
  }, workshops)
}

export async function getWorkshop(slug: string): Promise<Workshop | undefined> {
  return (await getWorkshops()).find((item) => item.slug === slug)
}

export async function getWorkshopsPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'workshops-page' })
    return {
      ...workshopsPage,
      ...data,
      hero: mergeHero(workshopsPage.hero, data.hero),
      cta: mergeGroup(workshopsPage.cta, data.cta),
      groupHealingItems: data.groupHealingItems?.length ? data.groupHealingItems : workshopsPage.groupHealingItems
    }
  }, workshopsPage)
}

export async function getBlogPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'blog-page' })
    return {
      ...blogPage,
      ...data,
      hero: mergeHero(blogPage.hero, data.hero),
      cta: mergeGroup(blogPage.cta, data.cta)
    }
  }, blogPage)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return withPayload(async (payload) => {
    const result: any = await payload.find({ collection: 'blog-posts', sort: '-publishedAt', depth: 2, limit: 50 })
    return result.docs.map((doc: any) => ({
      ...doc,
      category: categoryLabels(doc.categories, doc.category)[0] || doc.category,
      categories: categoryLabels(doc.categories, doc.category),
      image: mediaUrl(doc.image),
      content: [{ type: 'p', text: richTextToPlain(doc.content) }]
    }))
  }, blogPosts)
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return (await getBlogPosts()).find((post) => post.slug === slug)
}

export async function getPricingItems(): Promise<PricingItem[]> {
  return withPayload(async (payload) => {
    const result: any = await payload.find({ collection: 'pricing-items', sort: 'order', limit: 20 })
    return result.docs.map((doc: any) => ({ ...doc, features: arrayLabels(doc.features) }))
  }, pricingItems)
}

export async function getTarievenPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'tarieven-page' })
    return {
      ...tarievenPage,
      ...data,
      hero: mergeHero(tarievenPage.hero, data.hero),
      cta: mergeGroup(tarievenPage.cta, data.cta)
    }
  }, tarievenPage)
}

export async function getFaqs(pageContext = 'tarieven'): Promise<FAQ[]> {
  return withPayload(async (payload) => {
    const result: any = await payload.find({ collection: 'faqs', sort: 'order', limit: 50, where: { pageContext: { equals: pageContext } } })
    return result.docs
  }, faqs.filter((faq) => faq.pageContext === pageContext))
}

export async function getContactPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'contact-page' })
    return {
      ...contactPage,
      ...data,
      hero: mergeHero(contactPage.hero, data.hero),
      image: mediaUrl(data.image, contactPage.image),
      contactCards: data.contactCards?.length ? sortByOrder(data.contactCards) : contactPage.contactCards
    }
  }, contactPage)
}
