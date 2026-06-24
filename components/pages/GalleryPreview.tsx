'use client'

import { Reveal } from '@/components/Reveal'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { normalizeHomepage } from '@/lib/live-preview'

export function GalleryPreview({ page: initialPage }: { page: any }) {
  const page = usePayloadLivePreview({
    globalSlug: 'homepage',
    initialData: initialPage,
    normalize: normalizeHomepage
  })

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
              <ImageFrame
                src={item.image}
                alt={item.caption || page.galleryTitle || 'Kathara Nova sfeerbeeld'}
                ratio={index % 3 === 1 ? '1 / 1' : '4 / 3'}
                tone={index % 3 === 0 ? 'clay' : index % 3 === 1 ? 'sand' : 'sage'}
              />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
