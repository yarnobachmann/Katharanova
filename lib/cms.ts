import { unstable_noStore as noStore } from 'next/cache'

import { sql } from '@payloadcms/db-postgres'

import { getPayloadClient } from './payload/client'
import { normalizeRichText } from './richText'
import {
  aboutPage,
  blogPage,
  blogPosts,
  contactPage,
  faqs,
  home,
  locationPage,
  navigation,
  privacyPage,
  pricingItems,
  siteSettings,
  tarievenPage,
  treatments,
  termsPage,
  workshops,
  workshopsPage
} from './seed-data'
import type { BlogPost, FAQ, LegalPage, Navigation, PricingItem, SiteSettings, Treatment, Workshop } from './types'

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

const mediaUrl = (value: any, fallback: any = '', preserveFocus = true): any => {
  if (!value) return fallback
  if (typeof value === 'string') return value
  const focalX = typeof value.focalX === 'number' ? value.focalX : undefined
  const focalY = typeof value.focalY === 'number' ? value.focalY : undefined
  const url =
    preserveFocus && (typeof focalX === 'number' || typeof focalY === 'number') && value.url
      ? value.url
      :
    value.sizes?.large?.url ||
    value.sizes?.card?.url ||
    value.sizes?.thumbnail?.url ||
    value.thumbnailURL ||
    value.url ||
    fallback

  if (typeof url !== 'string') return fallback

  const src = toLocalMediaPath(url)

  if (preserveFocus && (typeof focalX === 'number' || typeof focalY === 'number')) {
    return { src, focalX, focalY, alt: value.alt }
  }

  return src
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
  image: value && Object.prototype.hasOwnProperty.call(value, 'image')
    ? mediaUrl(value.image, '')
    : fallback.image
})

const richText = (value: any, fallback: any = ''): any => normalizeRichText(value, fallback)

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
      logoMark: mediaUrl(data.logoMark, siteSettings.logoMark, false),
      logoFull: mediaUrl(data.logoFull, siteSettings.logoFull, false)
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

export async function getLocationPage() {
  return withPayload(async (payload) => {
    const data: any = await payload.findGlobal({ slug: 'location-page' })
    return {
      ...locationPage,
      ...data,
      hero: mergeHero(locationPage.hero, data.hero),
      cta: mergeGroup(locationPage.cta, data.cta),
      intro: richText(data.intro, locationPage.intro),
      carouselItems: data.carouselItems?.length
        ? sortByOrder(data.carouselItems).map((item: any) => ({
          ...item,
          image: mediaUrl(item.image)
        })).filter((item: any) => item.image)
        : locationPage.carouselItems,
      textBlocks: data.textBlocks?.length ? sortByOrder(data.textBlocks) : locationPage.textBlocks
    }
  }, locationPage)
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
      intro: richText(data.intro, aboutPage.intro),
      vision: richText(data.vision, aboutPage.vision),
      workingMethod: richText(data.workingMethod, aboutPage.workingMethod),
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
      whatBody: richText(doc.whatBody),
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
      content: richText(doc.content, doc.excerpt)
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
      content: richText(doc.content)
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

const valueFrom = (source: any, ...keys: string[]) => {
  for (const key of keys) {
    if (source?.[key] !== undefined && source[key] !== null) return source[key]
  }
  return undefined
}

const legalVersionToPage = (doc: any) => {
  const version = doc?.version || doc
  if (!version) return undefined

  const content = valueFrom(version, 'content', 'versionContent', 'version_content')
  if (!content) return undefined

  const hero = version.hero || {
    eyebrow: valueFrom(version, 'heroEyebrow', 'hero_eyebrow', 'versionHeroEyebrow', 'version_hero_eyebrow'),
    title: valueFrom(version, 'heroTitle', 'hero_title', 'versionHeroTitle', 'version_hero_title'),
    intro: valueFrom(version, 'heroIntro', 'hero_intro', 'versionHeroIntro', 'version_hero_intro'),
    image: valueFrom(version, 'heroImage', 'hero_image', 'versionHeroImage', 'version_hero_image')
  }

  return {
    ...version,
    hero,
    content
  }
}

const legalTableNames = {
  'terms-page': {
    current: 'terms_page',
    versions: '_terms_page_v'
  },
  'privacy-page': {
    current: 'privacy_page',
    versions: '_privacy_page_v'
  }
} as const

const rowsFromResult = (result: any) => Array.isArray(result) ? result : result?.rows || []

const latestLegalRow = async (
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  slug: 'terms-page' | 'privacy-page'
) => {
  const drizzle = (payload.db as any).drizzle
  const tables = legalTableNames[slug]
  if (!drizzle || !tables) return undefined

  const versionRows = rowsFromResult(await drizzle.execute(sql.raw(`
    select
      version_hero_eyebrow,
      version_hero_title,
      version_hero_intro,
      version_content,
      version__status,
      updated_at,
      created_at
    from "${tables.versions}"
    where version_content is not null
    order by updated_at desc nulls last, created_at desc nulls last
    limit 1
  `)))
  if (versionRows[0]) return versionRows[0]

  const currentRows = rowsFromResult(await drizzle.execute(sql.raw(`
    select
      hero_eyebrow,
      hero_title,
      hero_intro,
      content,
      _status,
      updated_at,
      created_at
    from "${tables.current}"
    where content is not null
    order by updated_at desc nulls last, created_at desc nulls last
    limit 1
  `)))

  return currentRows[0]
}

export async function getLegalPage(slug: 'terms-page' | 'privacy-page'): Promise<LegalPage> {
  const fallback = slug === 'terms-page' ? termsPage : privacyPage

  return withPayload(async (payload) => {
    const [directResult, draftResult, versionResult, publishedResult] = await Promise.allSettled([
      latestLegalRow(payload, slug),
      payload.findGlobal({ slug, draft: true, overrideAccess: true }),
      payload.findGlobalVersions({ slug, limit: 1, sort: '-updatedAt', overrideAccess: true }),
      payload.findGlobal({ slug, overrideAccess: true })
    ])
    const direct = directResult.status === 'fulfilled' ? legalVersionToPage(directResult.value) : undefined
    const draft = draftResult.status === 'fulfilled' ? draftResult.value as any : undefined
    const versions = versionResult.status === 'fulfilled' ? versionResult.value as any : undefined
    const published = publishedResult.status === 'fulfilled' ? publishedResult.value as any : undefined
    const latestVersion = legalVersionToPage(versions?.docs?.[0])
    const latest = direct || latestVersion || (draft?.content ? draft : undefined) || (published?.content ? published : undefined) || fallback

    return {
      ...fallback,
      ...latest,
      hero: mergeHero(fallback.hero, latest.hero),
      content: richText(latest.content, fallback.content)
    }
  }, fallback)
}
