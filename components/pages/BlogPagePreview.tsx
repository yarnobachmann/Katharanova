'use client'

import { Sparkles } from 'lucide-react'

import { BlogCard } from '@/components/cards/BlogCard'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeSimplePage } from '@/lib/live-preview'
import type { BlogPost } from '@/lib/types'

export function BlogPagePreview({ page: initialPage, posts, selected }: { page: any; posts: BlogPost[]; selected: string }) {
  const page = usePayloadLivePreview({
    globalSlug: 'blog-page',
    initialData: initialPage,
    normalize: normalizeSimplePage
  })
  const postCategories = (post: BlogPost) => post.categories?.length ? post.categories : [post.category]
  const categories = ['Alles', ...Array.from(new Set(posts.flatMap(postCategories).filter(Boolean)))]
  const featured = posts.find((post) => post.featured) || posts[0]
  const rest = posts.filter((post) => post.slug !== featured?.slug)
  const filtered = selected === 'Alles' ? rest : rest.filter((post) => postCategories(post).includes(selected))
  const showFeatured = featured && (selected === 'Alles' || postCategories(featured).includes(selected))

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="section">
        <div className="container prose-stack">
          <div className="blog-filters" aria-label="Blog categorieen">
            {categories.map((category) => <a key={category} className={selected === category ? 'active' : ''} href={category === 'Alles' ? '/blog' : `/blog?categorie=${encodeURIComponent(category)}`}>{category}</a>)}
          </div>
          {showFeatured ? <BlogCard post={featured} featured /> : null}
          <div className="grid-3">
            {filtered.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
          {!filtered.length && !showFeatured ? <p>Binnenkort meer over dit thema.</p> : null}
        </div>
      </section>
      <section className="section workshop-preview">
        <div className="container-text" style={{ textAlign: 'center' }}>
          <Sparkles color="var(--accent-hover)" />
          <h2>{page.cta.title}</h2>
          <p className="lead">{page.cta.text}</p>
          <Button href={page.cta.primaryHref} size="lg">{page.cta.primaryLabel}</Button>
        </div>
      </section>
    </main>
  )
}
