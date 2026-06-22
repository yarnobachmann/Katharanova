import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { formatDate } from '@/lib/format'
import type { BlogPost } from '@/lib/types'

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="blog-feature-link">
        <Card tone={post.tone} interactive className="blog-feature">
          <ImageFrame src={post.image} alt={post.title} ratio="auto" tone={post.tone === 'cream' ? 'sand' : post.tone} />
          <div>
            <div className="card-row-start"><Badge tone="gold">{post.category}</Badge><span>Uitgelicht</span></div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Meta post={post} />
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card-link">
      <Card as="article" tone={post.tone} interactive className="blog-card">
        <ImageFrame src={post.image} alt={post.title} ratio="16 / 10" tone={post.tone === 'cream' ? 'sand' : post.tone} />
        <div className="blog-card-body">
          <Badge tone="gold">{post.category}</Badge>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Meta post={post} />
        </div>
      </Card>
    </Link>
  )
}

export function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="meta-row">
      <span><Calendar size={15} />{formatDate(post.publishedAt)}</span>
      <span><Clock size={15} />{post.readTime} lezen</span>
    </div>
  )
}
