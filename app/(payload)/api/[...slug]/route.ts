import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT
} from '@payloadcms/next/routes'
import { NextResponse } from 'next/server'

const missingDatabase = () =>
  NextResponse.json(
    {
      error: 'Payload CMS database is not configured. Set DATABASE_URI in .env and restart the server.'
    },
    { status: 503 }
  )

export const GET = process.env.DATABASE_URI ? REST_GET(config) : missingDatabase
export const POST = process.env.DATABASE_URI ? REST_POST(config) : missingDatabase
export const DELETE = process.env.DATABASE_URI ? REST_DELETE(config) : missingDatabase
export const PATCH = process.env.DATABASE_URI ? REST_PATCH(config) : missingDatabase
export const PUT = process.env.DATABASE_URI ? REST_PUT(config) : missingDatabase
export const OPTIONS = process.env.DATABASE_URI ? REST_OPTIONS(config) : missingDatabase
