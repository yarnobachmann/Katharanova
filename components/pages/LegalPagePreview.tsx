'use client'

import { RichTextRenderer } from '@/components/cms/RichTextRenderer'
import { usePayloadLivePreview } from '@/components/live-preview/usePayloadLivePreview'
import { PageHero } from '@/components/ui/PageHero'
import { normalizeLegalPage } from '@/lib/live-preview'
import type { LegalPage } from '@/lib/types'

export function LegalPagePreview({ page: initialPage, globalSlug }: { page: LegalPage; globalSlug: 'terms-page' | 'privacy-page' }) {
  const page = usePayloadLivePreview({
    globalSlug,
    initialData: initialPage,
    normalize: normalizeLegalPage,
    previewFetchPath: `/api/globals/${globalSlug}?draft=true&depth=2`
  })

  return (
    <main>
      <PageHero {...page.hero} />
      <section className="article-section legal-page">
        <div className="container-text article-body article-content">
          <RichTextRenderer content={page.content} />
        </div>
      </section>
    </main>
  )
}
