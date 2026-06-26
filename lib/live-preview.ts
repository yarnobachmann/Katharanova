import type { BlogPost, Treatment, Workshop } from './types'

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

export const mediaUrl = (value: any, fallback: any = '', preserveFocus = true): any => {
  if (!value) return fallback
  if (typeof value === 'string') return value.startsWith('/') || value.startsWith('http') ? toLocalMediaPath(value) : fallback
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

export const arrayLabels = (value: any, fallback: string[] = []): string[] => {
  if (!Array.isArray(value)) return fallback
  const labels = value
    .map((item) => typeof item === 'string' ? item : item?.label)
    .filter((label): label is string => typeof label === 'string' && label.trim().length > 0)
  return labels.length ? labels : fallback
}

export const sortByOrder = <T extends { order?: number }>(items: T[] = []): T[] =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

const methodStepsFallback = [
  { title: 'Veiligheid', description: 'Eerst rust en vertrouwen - zonder druk.', order: 1 },
  { title: 'Verdieping', description: 'Samen kijken naar wat er werkelijk speelt.', order: 2 },
  { title: 'Integratie', description: 'Inzichten een plek geven in je dagelijks leven.', order: 3 }
]

export const categoryLabels = (value: any, fallback?: string): string[] => {
  const labels = Array.isArray(value)
    ? value.map((item) => typeof item === 'string' ? item : item?.title || item?.label).filter(Boolean)
    : []
  return labels.length ? labels : fallback ? [fallback] : []
}

export const richText = (value: any, fallback: any = ''): any => value || fallback

export const normalizeGroup = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {})
})

export const normalizeHero = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {}),
  image: value && Object.prototype.hasOwnProperty.call(value, 'image')
    ? mediaUrl(value.image, '')
    : fallback.image
})

export function normalizeHomepage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    cta: normalizeGroup(initial.cta, data.cta),
    recognitionItems: arrayLabels(data.recognitionItems, initial.recognitionItems),
    heroMetaItems: Array.isArray(data.heroMetaItems) && data.heroMetaItems.length ? sortByOrder(data.heroMetaItems) : initial.heroMetaItems,
    aboutImage: mediaUrl(data.aboutImage, initial.aboutImage),
    galleryItems: Array.isArray(data.galleryItems) && data.galleryItems.length
      ? sortByOrder(data.galleryItems).map((item: any) => ({
        ...item,
        image: mediaUrl(item.image)
      })).filter((item: any) => item.image)
      : initial.galleryItems
  }
}

export function normalizeGalleryPage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    galleryItems: Array.isArray(data.galleryItems) && data.galleryItems.length
      ? sortByOrder(data.galleryItems).map((item: any) => ({
        ...item,
        image: mediaUrl(item.image)
      })).filter((item: any) => item.image)
      : initial.galleryItems
  }
}

export function normalizeAboutPage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    cta: normalizeGroup(initial.cta, data.cta),
    portrait: mediaUrl(data.portrait, initial.portrait),
    stats: Array.isArray(data.stats) && data.stats.length ? data.stats : initial.stats || [],
    intro: richText(data.intro, initial.intro),
    vision: richText(data.vision, initial.vision),
    workingMethod: richText(data.workingMethod, initial.workingMethod),
    methodSteps: Array.isArray(data.methodSteps) && data.methodSteps.length ? sortByOrder(data.methodSteps) : initial.methodSteps || methodStepsFallback,
    forWho: arrayLabels(data.forWho, initial.forWho)
  }
}

export function normalizeSimplePage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    cta: normalizeGroup(initial.cta, data.cta)
  }
}

export function normalizeLegalPage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    content: richText(data.content, initial.content)
  }
}

export function normalizeContactPage(initial: any, data: any) {
  return {
    ...normalizeSimplePage(initial, data),
    image: mediaUrl(data.image, initial.image),
    contactCards: Array.isArray(data.contactCards) && data.contactCards.length ? sortByOrder(data.contactCards) : initial.contactCards
  }
}

export function normalizeWorkshopsPage(initial: any, data: any) {
  return {
    ...normalizeSimplePage(initial, data),
    groupHealingItems: Array.isArray(data.groupHealingItems) && data.groupHealingItems.length ? data.groupHealingItems : initial.groupHealingItems
  }
}

export function normalizeTreatment(initial: Treatment, data: any): Treatment {
  return {
    ...initial,
    ...data,
    image: mediaUrl(data.mainImage, initial.image),
    whatBody: richText(data.whatBody, initial.whatBody),
    forWho: arrayLabels(data.forWho, initial.forWho),
    outcomes: arrayLabels(data.outcomes, initial.outcomes),
    sessionSteps: Array.isArray(data.sessionSteps) ? data.sessionSteps : initial.sessionSteps
  }
}

export function normalizeBlogPost(initial: BlogPost, data: any): BlogPost {
  return {
    ...initial,
    ...data,
    category: categoryLabels(data.categories, data.category || initial.category)[0] || initial.category,
    categories: categoryLabels(data.categories, data.category || initial.category),
    image: mediaUrl(data.image, initial.image),
    content: richText(data.content, initial.content)
  }
}

export function normalizeWorkshopList(initial: Workshop[], data: any): Workshop[] {
  const edited = {
    ...data,
    image: mediaUrl(data.image),
    active: data.active ?? true,
    featured: data.featured ?? false,
    content: richText(data.content, data.excerpt)
  } as Workshop
  const index = initial.findIndex((workshop) => workshop.slug === edited.slug || (data.id && (workshop as any).id === data.id))

  if (index === -1) {
    return [edited, ...initial]
  }

  return initial.map((workshop, itemIndex) => itemIndex === index ? { ...workshop, ...edited } : workshop)
}

export function normalizeWorkshop(initial: Workshop, data: any): Workshop {
  return {
    ...initial,
    ...data,
    image: mediaUrl(data.image, initial.image),
    active: data.active ?? initial.active,
    featured: data.featured ?? initial.featured,
    content: richText(data.content, data.excerpt || initial.content || initial.excerpt)
  }
}
