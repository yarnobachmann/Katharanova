import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nl } from '@payloadcms/translations/languages/nl'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { BlogCategories } from '@/collections/BlogCategories'
import { BlogPosts } from '@/collections/BlogPosts'
import { FAQs } from '@/collections/FAQs'
import { Media } from '@/collections/Media'
import { PricingItems } from '@/collections/PricingItems'
import { Treatments } from '@/collections/Treatments'
import { Workshops } from '@/collections/Workshops'
import { AboutPage, BlogPage, ContactPage, GalleryPage, Homepage, TarievenPage, WorkshopsPage } from '@/globals/pages'
import { Navigation } from '@/globals/Navigation'
import { SiteSettings } from '@/globals/SiteSettings'
import { databaseUri, payloadSecret, serverUrl } from '@/lib/env'
import { livePreview } from '@/lib/payload/preview'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: serverUrl,
  admin: {
    user: 'users',
    theme: 'light',
    components: {
      providers: [
        {
          path: '@/components/payload/AdminTheme',
          exportName: 'AdminTheme'
        }
      ]
    },
    livePreview: {
      ...livePreview,
      collections: ['treatments', 'workshops', 'blog-posts'],
      globals: ['homepage', 'gallery-page', 'about-page', 'workshops-page', 'blog-page', 'tarieven-page', 'contact-page']
    }
  },
  collections: [
    {
      slug: 'users',
      auth: {
        cookies: {
          sameSite: 'Lax',
          secure: process.env.NODE_ENV === 'production'
        }
      },
      admin: { useAsTitle: 'email' },
      access: {
        read: ({ req }) => Boolean(req.user),
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user)
      },
      fields: []
    },
    Media,
    Treatments,
    Workshops,
    BlogCategories,
    BlogPosts,
    PricingItems,
    FAQs
  ],
  globals: [SiteSettings, Navigation, Homepage, GalleryPage, AboutPage, WorkshopsPage, BlogPage, TarievenPage, ContactPage],
  i18n: {
    supportedLanguages: { nl },
    fallbackLanguage: 'nl'
  },
  editor: lexicalEditor({}),
  cors: [serverUrl],
  csrf: [serverUrl],
  secret: payloadSecret,
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri
    }
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  sharp
})
