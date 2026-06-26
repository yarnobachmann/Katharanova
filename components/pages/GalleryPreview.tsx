'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { PageHero } from '@/components/ui/PageHero'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { normalizeGalleryPage } from '@/lib/live-preview'
import { imageObjectPosition, imageSrc } from '@/components/ui/ImageFrame'

export function GalleryPreview({ page: initialPage }: { page: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const page = usePayloadLivePreview({
    globalSlug: 'gallery-page',
    initialData: initialPage,
    normalize: normalizeGalleryPage
  })
  const activeItem = activeIndex === null ? null : page.galleryItems?.[activeIndex]
  const galleryItems = page.galleryItems || []

  useEffect(() => {
    if (!activeItem) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeItem])

  return (
    <main>
      <PageHero {...page.hero} />
      {galleryItems.length ? (
        <section className="gallery-section section">
          <div className="container">
            <Reveal stagger variant="cards" className="photo-gallery">
              {galleryItems.map((item: any, index: number) => (
                <figure className="gallery-item" key={`${imageSrc(item.image)}-${index}`}>
                  <button type="button" className="gallery-image-button" onClick={() => setActiveIndex(index)}>
                    <ImageFrame
                      src={item.image}
                      alt={item.caption || page.hero.title || 'Kathara Nova sfeerbeeld'}
                      ratio={index % 3 === 1 ? '1 / 1' : '4 / 3'}
                      tone={index % 3 === 0 ? 'clay' : index % 3 === 1 ? 'sand' : 'sage'}
                    />
                  </button>
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}
      {activeItem ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeItem.caption || page.hero.title || 'Vergrote foto'} onClick={() => setActiveIndex(null)}>
          <button type="button" className="gallery-lightbox-close" aria-label="Sluiten" onClick={() => setActiveIndex(null)}>
            <X size={24} />
          </button>
          <figure className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <img
              src={imageSrc(activeItem.image)}
              alt={activeItem.caption || page.hero.title || 'Kathara Nova sfeerbeeld'}
              style={imageObjectPosition(activeItem.image) ? { objectPosition: imageObjectPosition(activeItem.image) } : undefined}
            />
            {activeItem.caption ? <figcaption>{activeItem.caption}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </main>
  )
}
