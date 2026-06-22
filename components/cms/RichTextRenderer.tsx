import type { RichBlock } from '@/lib/types'

export function RichTextRenderer({ content }: { content: RichBlock[] | string }) {
  if (typeof content === 'string') {
    return content.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)
  }

  return content.map((block, index) => {
    if (block.type === 'lead') return <p className="article-lead" key={index}>{block.text}</p>
    if (block.type === 'h') return <h2 key={index}>{block.text}</h2>
    if (block.type === 'quote') return <blockquote key={index}><span>✦</span><p>{block.text}</p></blockquote>
    return <p key={index}>{block.text}</p>
  })
}
