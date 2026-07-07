import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { aboutPage, blogCategories, blogPage, blogPosts, contactPage, faqs, home, navigation, pricingItems, privacyPage, seoLandingPages, siteSettings, tarievenPage, termsPage, treatments, workshops, workshopsPage } from '../lib/seed-data'
import { textToLexical } from '../lib/richText'

async function upsertGlobal(payload: any, slug: string, data: any) {
  await payload.updateGlobal({ slug, data })
}

async function upsertBySlug(payload: any, collection: string, slug: string, data: any) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data })
  } else {
    await payload.create({ collection, data })
  }
}

function withoutUploads<T extends Record<string, any>>(data: T, uploadFields: string[]) {
  const copy: Record<string, any> = { ...data }
  for (const field of uploadFields) {
    delete copy[field]
  }
  if (copy.hero?.image) {
    copy.hero = { ...copy.hero }
    delete copy.hero.image
  }
  return copy as T
}

const labelArray = (items: string[]) => items.map((label) => ({ label }))

async function run() {
  const payload = await getPayload({ config })

  const adminEmail = process.env.PAYLOAD_SEED_EMAIL || 'admin@katharanova.nl'
  const adminPassword = process.env.PAYLOAD_SEED_PASSWORD

  if (!adminPassword) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('PAYLOAD_SEED_PASSWORD is required when seeding production.')
    }
    console.warn('Using development seed password. Set PAYLOAD_SEED_PASSWORD before seeding shared environments.')
  }

  const seedPassword = adminPassword || 'KatharaNova2026!'
  const users = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1 })
  if (!users.docs[0]) {
    await payload.create({ collection: 'users', data: { email: adminEmail, password: seedPassword } })
  }

  await upsertGlobal(payload, 'site-settings', withoutUploads(siteSettings, ['logoMark', 'logoFull']))
  await upsertGlobal(payload, 'navigation', navigation)
  await upsertGlobal(payload, 'homepage', {
    ...withoutUploads(home, ['aboutImage']),
    recognitionItems: labelArray(home.recognitionItems)
  })
  await upsertGlobal(payload, 'about-page', {
    ...withoutUploads(aboutPage, ['portrait']),
    intro: textToLexical(aboutPage.intro),
    vision: textToLexical(aboutPage.vision),
    workingMethod: textToLexical(aboutPage.workingMethod),
    forWho: labelArray(aboutPage.forWho)
  })
  await upsertGlobal(payload, 'workshops-page', withoutUploads(workshopsPage, []))
  await upsertGlobal(payload, 'blog-page', withoutUploads(blogPage, []))
  await upsertGlobal(payload, 'tarieven-page', withoutUploads(tarievenPage, []))
  await upsertGlobal(payload, 'contact-page', withoutUploads(contactPage, ['image']))
  await upsertGlobal(payload, 'terms-page', {
    ...termsPage,
    content: textToLexical(termsPage.content as string)
  })
  await upsertGlobal(payload, 'privacy-page', {
    ...privacyPage,
    content: textToLexical(privacyPage.content as string)
  })

  for (const treatment of treatments) {
    await upsertBySlug(payload, 'treatments', treatment.slug, {
      ...treatment,
      _status: 'published',
      mainImage: undefined,
      whatBody: textToLexical(treatment.whatBody),
      forWho: treatment.forWho.map((label) => ({ label })),
      outcomes: treatment.outcomes.map((label) => ({ label }))
    })
  }

  for (const workshop of workshops) {
    await upsertBySlug(payload, 'workshops', workshop.slug, {
      ...workshop,
      _status: 'published',
      image: undefined,
      content: textToLexical(workshop.excerpt)
    })
  }

  const categoryIds = new Map<string, string | number>()
  for (const category of blogCategories) {
    await upsertBySlug(payload, 'blog-categories', category.slug, category)
    const existing = await payload.find({ collection: 'blog-categories', where: { slug: { equals: category.slug } }, limit: 1 })
    if (existing.docs[0]) categoryIds.set(category.title, existing.docs[0].id)
  }

  for (const post of blogPosts) {
    const categoryId = categoryIds.get(post.category)
    const categories = categoryId ? [categoryId] : []
    await upsertBySlug(payload, 'blog-posts', post.slug, {
      ...post,
      _status: 'published',
      categories,
      image: undefined,
      content: textToLexical(post.content.map((block: { text: string }) => block.text).join('\n\n'))
    })
  }

  for (const page of seoLandingPages) {
    await upsertBySlug(payload, 'seo-landing-pages', page.slug, {
      ...page,
      highlights: page.highlights.map((label) => ({ label }))
    })
  }

  for (const item of pricingItems) {
    const existing = await payload.find({ collection: 'pricing-items', where: { title: { equals: item.title } }, limit: 1 })
    const data = { ...item, features: item.features.map((label) => ({ label })) }
    if (existing.docs[0]) await payload.update({ collection: 'pricing-items', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'pricing-items', data })
  }

  for (const faq of faqs) {
    const existing = await payload.find({ collection: 'faqs', where: { question: { equals: faq.question } }, limit: 1 })
    const data = { ...faq, pageContext: 'tarieven' as const }
    if (existing.docs[0]) await payload.update({ collection: 'faqs', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'faqs', data })
  }

  console.log(`Seed complete. Admin: ${adminEmail}`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
