import { GalleryPreview } from '@/components/pages/GalleryPreview'
import { PageHero } from '@/components/ui/PageHero'
import { getGalleryPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getGalleryPage()

  return createMetadata({
    title: pageTitle(page.galleryTitle || 'Fotogallerij'),
    description: page.galleryIntro || 'Een indruk van de sfeer van de praktijk.',
    image: page.galleryItems?.[0]?.image,
    path: '/fotogallerij'
  })
}

export default async function FotogallerijPage() {
  const page = await getGalleryPage()

  return (
    <main>
      <PageHero
        eyebrow={page.galleryEyebrow || 'Fotogallerij'}
        title={page.galleryTitle || 'Sfeer van de praktijk'}
        intro={page.galleryIntro || 'Een indruk van de rust, natuur en aandacht die de begeleiding dragen.'}
        image={page.galleryItems?.[0]?.image}
      />
      <GalleryPreview page={page} />
    </main>
  )
}
