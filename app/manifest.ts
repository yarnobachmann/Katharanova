import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kathara Nova',
    short_name: 'Kathara Nova',
    description: 'Holistische therapie, heling en bewustwording.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F1E6',
    theme_color: '#C9942E',
    lang: 'nl',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/assets/logo-phoenix-mark.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

