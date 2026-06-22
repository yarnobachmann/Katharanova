import { BlogPagePreview } from '@/components/pages/BlogPagePreview'
import { getBlogPage, getBlogPosts } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getBlogPage()

  return createMetadata({
    title: pageTitle(page.hero.title),
    description: page.hero.intro,
    image: page.hero.image,
    path: '/blog'
  })
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
  const [{ categorie }, page, posts] = await Promise.all([searchParams, getBlogPage(), getBlogPosts()])
  const selected = categorie || 'Alles'

  return <BlogPagePreview page={page} posts={posts} selected={selected} />
}
