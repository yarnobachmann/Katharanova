import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getNavigation, getSiteSettings } from '@/lib/cms'
import { createBusinessSchema, createMetadata, serializeJsonLd } from '@/lib/seo'
import '../globals.css'
import '@/components/pages/pages.css'
import './site.css'

export const metadata = createMetadata()

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, navigation] = await Promise.all([getSiteSettings(), getNavigation()])

  return (
    <html lang="nl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(createBusinessSchema(settings)) }}
        />
        <Header settings={settings} navigation={navigation} />
        {children}
        <Footer settings={settings} navigation={navigation} />
      </body>
    </html>
  )
}
