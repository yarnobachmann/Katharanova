export type Tone = 'cream' | 'sage' | 'clay' | 'sand' | 'dark'

export type MediaLike = {
  url?: string
  alt?: string
}

export type NavItem = { label: string; href: string }

export type SiteSettings = {
  siteName: string
  siteTitle: string
  siteDescription: string
  logoMark: string
  logoFull: string
  email: string
  phone: string
  location: string
  appointmentUrl: string
  instagram?: string
  linkedin?: string
  footerText: string
  copyright: string
}

export type Navigation = {
  navItems: NavItem[]
  treatmentItems?: NavItem[]
  ctaLabel: string
  ctaHref: string
}

export type Hero = {
  eyebrow: string
  title: string
  intro: string
  image?: string
}

export type Treatment = {
  title: string
  slug: string
  navLabel: string
  eyebrow: string
  summary: string
  intro: string
  image: string
  icon: string
  tone: Tone
  order: number
  whatTitle: string
  whatBody: string
  forWhoTitle?: string
  forWho: string[]
  sessionTitle?: string
  sessionSteps: { title: string; description: string }[]
  outcomesTitle?: string
  outcomes: string[]
  ctaTitle: string
  ctaText: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export type Workshop = {
  title: string
  slug: string
  date: string
  location: string
  durationLabel: string
  spotsLabel: string
  price: string
  excerpt: string
  image: string
  tone: Tone
  active: boolean
  featured: boolean
  content?: RichBlock[] | string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export type BlogPost = {
  title: string
  slug: string
  category: string
  categories?: string[]
  excerpt: string
  publishedAt: string
  readTime: string
  image: string
  tone: Tone
  featured: boolean
  content: RichBlock[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

export type RichBlock = {
  type: 'lead' | 'p' | 'h' | 'quote'
  text: string
}

export type PricingItem = {
  title: string
  price: string
  unit?: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured: boolean
  tone: Tone
  order: number
}

export type FAQ = { question: string; answer: string; pageContext: string; order: number }

export type HeroMetaItem = { icon: string; label: string; order?: number }
