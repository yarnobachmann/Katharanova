import type { ElementType, ReactNode } from 'react'

import Link from 'next/link'

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16
const FORMAT_SUBSCRIPT = 32
const FORMAT_SUPERSCRIPT = 64

function renderText(node: any, key: number) {
  let content: ReactNode = node.text
  if (node.format & FORMAT_CODE) content = <code>{content}</code>
  if (node.format & FORMAT_BOLD) content = <strong>{content}</strong>
  if (node.format & FORMAT_ITALIC) content = <em>{content}</em>
  if (node.format & FORMAT_UNDERLINE) content = <u>{content}</u>
  if (node.format & FORMAT_STRIKETHROUGH) content = <s>{content}</s>
  if (node.format & FORMAT_SUBSCRIPT) content = <sub>{content}</sub>
  if (node.format & FORMAT_SUPERSCRIPT) content = <sup>{content}</sup>
  return <span key={key}>{content}</span>
}

function imageUrl(value: any): string {
  return value?.sizes?.large?.url || value?.sizes?.card?.url || value?.url || ''
}

function renderNode(node: any, key: number): ReactNode {
  if (!node) return null

  if (node.type === 'text') return renderText(node, key)
  if (node.type === 'linebreak') return <br key={key} />

  const children = Array.isArray(node.children) ? node.children.map((child: any, index: number) => renderNode(child, index)) : null

  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{children}</p>
    case 'heading': {
      const Tag = (node.tag || 'h2') as ElementType
      return <Tag key={key}>{children}</Tag>
    }
    case 'quote':
      return <blockquote key={key}><span>✦</span><p>{children}</p></blockquote>
    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return <ListTag key={key}>{children}</ListTag>
    }
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'link':
    case 'autolink': {
      const url = node.fields?.url || '#'
      return <Link key={key} href={url} target={node.fields?.newTab ? '_blank' : undefined} rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}>{children}</Link>
    }
    case 'horizontalrule':
      return <hr key={key} />
    case 'upload': {
      const src = imageUrl(node.value)
      if (!src) return null
      return <img key={key} src={src} alt={node.value?.alt || ''} loading="lazy" />
    }
    default:
      return children ? <div key={key}>{children}</div> : null
  }
}

function renderLegacyBlock(block: { type: string; text: string }, key: number) {
  if (block.type === 'lead') return <p className="article-lead" key={key}>{block.text}</p>
  if (block.type === 'h') return <h2 key={key}>{block.text}</h2>
  if (block.type === 'quote') return <blockquote key={key}><span>✦</span><p>{block.text}</p></blockquote>
  return <p key={key}>{block.text}</p>
}

export function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null
  if (typeof content === 'string') {
    return content.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }
  if (Array.isArray(content)) {
    return content.map((block, index) => renderLegacyBlock(block, index))
  }

  const rootChildren = content?.root?.children
  if (!Array.isArray(rootChildren)) return null

  return rootChildren.map((node: any, index: number) => renderNode(node, index))
}
