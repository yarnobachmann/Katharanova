import Image from 'next/image'

import type { MediaSource } from '@/lib/types'

export const imageSrc = (src?: MediaSource) => {
  if (!src) return ''
  return typeof src === 'string' ? src : src.src || src.url || ''
}

export const imageObjectPosition = (src?: MediaSource) => {
  if (!src || typeof src === 'string') return undefined

  const x = typeof src.focalX === 'number' ? src.focalX : 50
  const y = typeof src.focalY === 'number' ? src.focalY : 50

  return `${x}% ${y}%`
}

export function ImageFrame({
  src,
  alt,
  ratio = '4 / 3',
  tone = 'sand',
  organic = false,
  priority = false
}: {
  src?: MediaSource
  alt: string
  ratio?: string
  tone?: 'sand' | 'sage' | 'clay' | 'cream'
  organic?: boolean
  priority?: boolean
}) {
  const resolvedSrc = imageSrc(src)
  const objectPosition = imageObjectPosition(src)
  const isPayloadMedia = resolvedSrc.startsWith('/api/media/file/')

  return (
    <div className={`image-frame image-frame-${tone} ${organic ? 'image-frame-organic' : ''}`} style={{ aspectRatio: ratio }}>
      {resolvedSrc ? (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          unoptimized={isPayloadMedia}
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : null}
      <span className="image-warmth" aria-hidden="true" />
    </div>
  )
}
