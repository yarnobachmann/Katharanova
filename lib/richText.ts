export function textToLexical(text: string) {
  return {
    root: {
      children: text.split('\n\n').map((paragraph) => ({
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph,
            type: 'text',
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        type: 'paragraph',
        version: 1
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1
    }
  }
}

export function isLexicalRichText(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false

  const root = (value as any).root
  if (!root || root.type !== 'root' || !Array.isArray(root.children)) return false

  return root.children.every((node: any) => {
    if (!node || typeof node !== 'object') return false
    if (!Array.isArray(node.children)) return false
    return typeof node.type === 'string' && typeof node.direction === 'string'
  })
}

export function normalizeRichText(value: unknown, fallback: unknown = ''): unknown {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value
  if (isLexicalRichText(value)) return value
  return fallback
}
