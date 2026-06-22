import { notFound } from 'next/navigation'

import { BlogPostPreview } from '@/components/pages/BlogPostPreview'
import { getBlogPost, getBlogPosts } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return createMetadata({
    title: post.seo?.metaTitle || pageTitle(post.title),
    description: post.seo?.metaDescription || post.excerpt,
    image: post.image,
    path: `/blog/${post.slug}`
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, posts] = await Promise.all([getBlogPost(slug), getBlogPosts()])
  if (!post) notFound()
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return <BlogPostPreview post={post} related={related} />
}
