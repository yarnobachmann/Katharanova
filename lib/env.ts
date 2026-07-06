const isProduction = process.env.NODE_ENV === 'production'
const isNextProductionBuild = process.env.NEXT_PHASE === 'phase-production-build'

function readEnv(name: string, fallback: string) {
  const value = process.env[name]

  if (value) {
    return value
  }

  if (isProduction && !isNextProductionBuild) {
    throw new Error(`${name} is required in production.`)
  }

  return fallback
}

function readSecret(name: string, fallback: string) {
  const value = readEnv(name, fallback)

  if (isProduction && !isNextProductionBuild && (value === fallback || value.length < 32)) {
    throw new Error(`${name} must be a long random value in production.`)
  }

  return value
}

const coolifyUrl = process.env.COOLIFY_URL
const coolifyFqdn = process.env.COOLIFY_FQDN
const inferredServerUrl = coolifyUrl || (coolifyFqdn ? `https://${coolifyFqdn}` : 'http://localhost:3000')

export const databaseUri = readEnv(
  'DATABASE_URI',
  'postgres://postgres:postgres@localhost:5432/kathara_nova'
)

export const payloadSecret = readSecret('PAYLOAD_SECRET', 'dev-secret-change-me')

export const serverUrl = readEnv('NEXT_PUBLIC_SERVER_URL', inferredServerUrl).replace(/\/+$/, '')
