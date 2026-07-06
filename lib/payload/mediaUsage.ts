import type { Payload } from 'payload'

type MediaUsage = {
  collection?: string
  field: string
  global?: string
  ids: Array<number | string>
  total: number
}

type MediaUsageExclude = {
  collection?: string
  global?: string
  id?: number | string
}

function isMediaId(value: number | string | undefined): value is number | string {
  return typeof value === 'number' || typeof value === 'string'
}

const globalMediaFields = [
  { slug: 'site-settings', paths: ['logoMark', 'logoFull'] },
  { slug: 'homepage', paths: ['hero.image', 'aboutImage', 'galleryItems.image'] },
  { slug: 'gallery-page', paths: ['hero.image'] },
  { slug: 'location-page', paths: ['hero.image', 'carouselItems.image'] },
  { slug: 'about-page', paths: ['hero.image', 'portrait'] },
  { slug: 'workshops-page', paths: ['hero.image'] },
  { slug: 'blog-page', paths: ['hero.image'] },
  { slug: 'tarieven-page', paths: ['hero.image'] },
  { slug: 'contact-page', paths: ['hero.image', 'image'] }
]

export function mediaIdFromValue(value: unknown): number | string | undefined {
  if (typeof value === 'number' || typeof value === 'string') return value
  if (!value || typeof value !== 'object') return undefined

  const media = value as Record<string, any>
  if (typeof media.id === 'number' || typeof media.id === 'string') return media.id
  if (typeof media.value === 'number' || typeof media.value === 'string') return media.value
  if (typeof media.value?.id === 'number' || typeof media.value?.id === 'string') return media.value.id
  if (typeof media.doc?.id === 'number' || typeof media.doc?.id === 'string') return media.doc.id

  return undefined
}

async function countMediaRefs(payload: Payload, collection: string, field: string, mediaId: string | number, exclude?: MediaUsageExclude): Promise<MediaUsage | null> {
  const result = await payload.find({
    collection: collection as any,
    depth: 0,
    limit: 100,
    overrideAccess: true,
    where: {
      [field]: {
        equals: mediaId
      }
    }
  })

  const docs = result.docs.filter((doc: any) => !(exclude?.collection === collection && String(doc.id) === String(exclude.id)))
  return docs.length > 0 ? { collection, field, ids: docs.map((doc: any) => doc.id), total: docs.length } : null
}

function valuesAtPath(value: any, path: string): unknown[] {
  const [head, ...tail] = path.split('.')
  if (!head || value == null) return []

  const current = value[head]
  if (Array.isArray(current)) {
    return current.flatMap((item) => tail.length ? valuesAtPath(item, tail.join('.')) : [item])
  }

  if (!tail.length) return [current]
  return valuesAtPath(current, tail.join('.'))
}

function hasMediaIdAtPath(doc: any, path: string, mediaId: string | number) {
  return valuesAtPath(doc, path).some((value) => String(mediaIdFromValue(value)) === String(mediaId))
}

async function findGlobalMediaUsages(payload: Payload, mediaId: string | number, exclude?: MediaUsageExclude): Promise<MediaUsage[]> {
  const usages = await Promise.all(globalMediaFields.map(async ({ paths, slug }) => {
    if (exclude?.global === slug) return null

    try {
      const doc: any = await payload.findGlobal({ slug: slug as any, depth: 0, overrideAccess: true })
      const usedPaths = paths.filter((path) => hasMediaIdAtPath(doc, path, mediaId))
      return usedPaths.length ? { global: slug, field: usedPaths.join(', '), ids: [slug], total: usedPaths.length } : null
    } catch {
      return null
    }
  }))

  return usages.filter((usage): usage is NonNullable<typeof usage> => Boolean(usage))
}

export async function findMediaUsages(payload: Payload, mediaId: string | number, exclude?: MediaUsageExclude): Promise<MediaUsage[]> {
  const [collectionUsages, globalUsages] = await Promise.all([
    Promise.all([
      countMediaRefs(payload, 'treatments', 'mainImage', mediaId, exclude),
      countMediaRefs(payload, 'workshops', 'image', mediaId, exclude),
      countMediaRefs(payload, 'blog-posts', 'image', mediaId, exclude),
      countMediaRefs(payload, 'gallery-photos', 'image', mediaId, exclude)
    ]),
    findGlobalMediaUsages(payload, mediaId, exclude)
  ])

  return [
    ...collectionUsages.filter((usage): usage is MediaUsage => Boolean(usage)),
    ...globalUsages
  ]
}

export function mediaUsageCount(usages: MediaUsage[]): number {
  return usages.reduce((total, usage) => total + usage.total, 0)
}

export async function ensureUniqueMediaValue({
  collection,
  data,
  fieldLabel,
  global,
  id,
  paths,
  req
}: {
  collection?: string
  data: Record<string, any>
  fieldLabel: string
  global?: string
  id?: number | string
  paths: string[]
  req: { payload: Payload }
}) {
  const mediaIds = Array.from(new Set(paths.flatMap((path) => valuesAtPath(data, path).map(mediaIdFromValue).filter(isMediaId))))

  for (const mediaId of mediaIds) {
    const usages = await findMediaUsages(req.payload, mediaId, { collection, global, id })
    if (mediaUsageCount(usages) > 0) {
      throw new Error(`Deze afbeelding wordt al ergens anders gebruikt. Upload of kies een unieke afbeelding voor ${fieldLabel}.`)
    }
  }
}
