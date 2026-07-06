import { NextResponse } from 'next/server'

import { getLegalPage } from '@/lib/cms'

const legalSlugs = new Set(['terms-page', 'privacy-page'])

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!legalSlugs.has(slug)) {
    return NextResponse.json({ error: 'Unknown legal page' }, { status: 404 })
  }

  const page = await getLegalPage(slug as 'terms-page' | 'privacy-page')

  return NextResponse.json(page, {
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}
