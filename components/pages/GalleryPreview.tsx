'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { normalizeGalleryPage } from '@/lib/live-preview'

export function GalleryPreview({ page: initialPage }: { page: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const page = usePayloadLivePreview({
    globalSlug: 'gallery-page',
    initialData: initialPage,
    normalize: normalizeGalleryPage
  })
  const activeItem = activeIndex === null ? null : page.galleryItems?.[activeIndex]

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

  if (!page.galleryItems?.length) return null

  return (
    <section className="gallery-section section">
      <div className="container">
        <SectionHeading
          eyebrow={page.galleryEyebrow || 'Fotogallerij'}
          title={page.galleryTitle || 'Sfeer van de praktijk'}
          intro={page.galleryIntro}
          divider
        />
        <Reveal stagger variant="cards" className="photo-gallery">
          {page.galleryItems.map((item: any, index: number) => (
            <figure className="gallery-item" key={`${item.image}-${index}`}>
              <button type="button" className="gallery-image-button" onClick={() => setActiveIndex(index)}>
                <ImageFrame
                  src={item.image}
                  alt={item.caption || page.galleryTitle || 'Kathara Nova sfeerbeeld'}
                  ratio={index % 3 === 1 ? '1 / 1' : '4 / 3'}
                  tone={index % 3 === 0 ? 'clay' : index % 3 === 1 ? 'sand' : 'sage'}
                />
              </button>
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </Reveal>
      </div>
      {activeItem ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeItem.caption || page.galleryTitle || 'Vergrote foto'} onClick={() => setActiveIndex(null)}>
          <button type="button" className="gallery-lightbox-close" aria-label="Sluiten" onClick={() => setActiveIndex(null)}>
            <X size={24} />
          </button>
          <figure className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <img src={activeItem.image} alt={activeItem.caption || page.galleryTitle || 'Kathara Nova sfeerbeeld'} />
            {activeItem.caption ? <figcaption>{activeItem.caption}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </section>
  )
}
