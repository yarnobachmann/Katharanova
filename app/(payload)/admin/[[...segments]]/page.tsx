import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

// Payload generates this file for Admin client component mappings.
// @ts-expect-error generated JavaScript import map
import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }: any) =>
  generatePageMetadata({ config, params, searchParams })

export default function AdminPage(props: any) {
  return RootPage({ config, importMap, ...props })
}
