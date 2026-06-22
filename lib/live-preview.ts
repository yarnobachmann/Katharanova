import type { BlogPost, Treatment, Workshop } from './types'

export const mediaUrl = (value: any, fallback = ''): string => {
  if (!value) return fallback
  if (typeof value === 'string') return value.startsWith('/') || value.startsWith('http') ? value : fallback
  return value.url || value.thumbnailURL || value.sizes?.large?.url || value.sizes?.card?.url || fallback
}

export const arrayLabels = (value: any, fallback: string[] = []): string[] => {
  if (!Array.isArray(value)) return fallback
  const labels = value.map((item) => item?.label || item).filter(Boolean)
  return labels.length ? labels : fallback
}

export const sortByOrder = <T extends { order?: number }>(items: T[] = []): T[] =>
  [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

export const categoryLabels = (value: any, fallback?: string): string[] => {
  const labels = Array.isArray(value)
    ? value.map((item) => typeof item === 'string' ? item : item?.title || item?.label).filter(Boolean)
    : []
  return labels.length ? labels : fallback ? [fallback] : []
}

export const richTextToPlain = (value: any, fallback = ''): string => {
  if (!value) return fallback
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

export const normalizeGroup = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {})
})

export const normalizeHero = <T extends Record<string, any>>(fallback: T, value: any): T => ({
  ...fallback,
  ...(value || {}),
  image: mediaUrl(value?.image, fallback.image)
})

export function normalizeHomepage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    cta: normalizeGroup(initial.cta, data.cta),
    recognitionItems: arrayLabels(data.recognitionItems, initial.recognitionItems),
    heroMetaItems: Array.isArray(data.heroMetaItems) && data.heroMetaItems.length ? sortByOrder(data.heroMetaItems) : initial.heroMetaItems,
    aboutImage: mediaUrl(data.aboutImage, initial.aboutImage)
  }
}

export function normalizeAboutPage(initial: any, data: any) {
  return {
    ...initial,
    ...data,
    hero: normalizeHero(initial.hero, data.hero),
    cta: normalizeGroup(initial.cta, data.cta),
    portrait: mediaUrl(data.portrait, initial.portrait),
    intro: richTextToPlain(data.intro, initial.intro),
    vision: richTextToPlain(data.vision, initial.vision),
    workingMethod: richTextToPlain(data.workingMethod, initial.workingMethod),
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
    whatBody: richTextToPlain(data.whatBody, initial.whatBody),
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
    content: [{ type: 'p', text: richTextToPlain(data.content, initial.content.map((block) => block.text).join('\n\n')) }]
  }
}

export function normalizeWorkshopList(initial: Workshop[], data: any): Workshop[] {
  const edited = {
    ...data,
    image: mediaUrl(data.image),
    active: data.active ?? true,
    featured: data.featured ?? false
  } as Workshop
  const index = initial.findIndex((workshop) => workshop.slug === edited.slug || (data.id && (workshop as any).id === data.id))

  if (index === -1) {
    return [edited, ...initial]
  }

  return initial.map((workshop, itemIndex) => itemIndex === index ? { ...workshop, ...edited } : workshop)
}
