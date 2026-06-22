'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { BlogCard, Meta } from '@/components/cards/BlogCard'
import { RichTextRenderer } from '@/components/cms/RichTextRenderer'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { normalizeBlogPost } from '@/lib/live-preview'
import type { BlogPost } from '@/lib/types'

export function BlogPostPreview({ post: initialPost, related }: { post: BlogPost; related: BlogPost[] }) {
  const post = usePayloadLivePreview({
    collectionSlug: 'blog-posts',
    initialData: initialPost,
    normalize: normalizeBlogPost
  })

  return (
    <main>
      <section className="page-hero">
        <img src="/assets/logo-phoenix-mark.png" alt="" aria-hidden="true" className="page-hero-mark" />
        <div className="container-text">
          <Link href="/blog" className="back-link"><ArrowLeft size={16} /> Terug naar blog</Link>
          <div className="article-hero-meta"><Badge tone="gold">{post.category}</Badge><Meta post={post} /></div>
          <h1>{post.title}</h1>
        </div>
      </section>
      <div className="container article-image-wrap"><ImageFrame src={post.image} alt={post.title} ratio="21 / 9" tone={post.tone === 'cream' ? 'sand' : post.tone} /></div>
      <article className="container article-body article-body-wide">
        <RichTextRenderer content={post.content} />
        <Card tone="dark" className="side-cta">
          <h3>Kathara Nova</h3>
          <p>Herken je iets in deze woorden? Je hoeft nog niet precies te weten wat je nodig hebt. Stel vrijblijvend je vraag - ik denk graag met je mee.</p>
          <Button href="/contact">Plan een afspraak</Button>
        </Card>
      </article>
      <section className="section recognition">
        <div className="container">
          <SectionHeading align="left" eyebrow="Lees ook" title="Andere woorden voor onderweg" divider />
          <div className="grid-3 cards-space">
            {related.map((item) => <BlogCard key={item.slug} post={item} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
