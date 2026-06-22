const isProduction = process.env.NODE_ENV === 'production'

function readEnv(name: string, fallback: string) {
  const value = process.env[name]

  if (value) {
    return value
  }

  if (isProduction) {
    throw new Error(`${name} is required in production.`)
  }

  return fallback
}

export const databaseUri = readEnv(
  'DATABASE_URI',
  'postgres://postgres:postgres@localhost:5432/kathara_nova'
)

export const payloadSecret = readEnv('PAYLOAD_SECRET', 'dev-secret-change-me')

export const serverUrl = readEnv('NEXT_PUBLIC_SERVER_URL', 'http://localhost:3000').replace(/\/+$/, '')

