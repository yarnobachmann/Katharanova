const allowedAbsoluteProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:'])

export function safeHref(value: unknown, fallback = '/'): string {
  if (typeof value !== 'string') return fallback

  const href = value.trim()
  if (!href) return fallback

  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (href.startsWith('#')) return href

  try {
    const url = new URL(href)
    return allowedAbsoluteProtocols.has(url.protocol) ? href : fallback
  } catch {
    return fallback
  }
}
