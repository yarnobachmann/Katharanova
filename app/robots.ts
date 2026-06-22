import type { MetadataRoute } from 'next'

import { serverUrl } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/']
    },
    sitemap: `${serverUrl}/sitemap.xml`
  }
}

