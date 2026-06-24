import { GalleryPreview } from '@/components/pages/GalleryPreview'
import { getGalleryPage } from '@/lib/cms'
import { createMetadata, pageTitle } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const page = await getGalleryPage()

  return createMetadata({
    title: pageTitle(page.hero.title || 'Fotogallerij'),
    description: page.hero.intro || 'Een indruk van de sfeer van de praktijk.',
    image: page.hero.image || page.galleryItems?.[0]?.image,
    path: '/fotogallerij'
  })
}

export default async function FotogallerijPage() {
  const page = await getGalleryPage()

  return <GalleryPreview page={page} />
}
