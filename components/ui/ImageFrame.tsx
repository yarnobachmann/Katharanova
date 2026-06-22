import Image from 'next/image'

export function ImageFrame({
  src,
  alt,
  ratio = '4 / 3',
  tone = 'sand',
  organic = false,
  priority = false
}: {
  src?: string
  alt: string
  ratio?: string
  tone?: 'sand' | 'sage' | 'clay' | 'dark' | 'cream'
  organic?: boolean
  priority?: boolean
}) {
  const isPayloadMedia = src?.startsWith('/api/media/file/')

  return (
    <div className={`image-frame image-frame-${tone} ${organic ? 'image-frame-organic' : ''}`} style={{ aspectRatio: ratio }}>
      {src ? <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} unoptimized={isPayloadMedia} /> : null}
      <span className="image-warmth" aria-hidden="true" />
    </div>
  )
}
