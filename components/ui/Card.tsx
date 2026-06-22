import type { ElementType } from 'react'

export function Card({
  as,
  tone = 'cream',
  interactive = false,
  className = '',
  children
}: {
  as?: ElementType
  tone?: 'cream' | 'sage' | 'clay' | 'sand' | 'dark' | 'outline'
  interactive?: boolean
  className?: string
  children: React.ReactNode
}) {
  const Tag = as || 'div'
  return <Tag className={`card card-${tone} ${interactive ? 'card-interactive' : ''} ${className}`}>{children}</Tag>
}
