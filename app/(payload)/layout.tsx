import type { ReactNode } from 'react'

import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'

// Payload generates this file for Admin client component mappings.
// @ts-expect-error generated JavaScript import map
import { importMap } from './admin/importMap'

async function serverFunction(args: any) {
  'use server'

  return handleServerFunctions({ ...args, config, importMap })
}

export default function PayloadLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
