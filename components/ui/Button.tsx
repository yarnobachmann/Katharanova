import Link from 'next/link'
import type { ComponentProps } from 'react'

import { safeHref } from '@/lib/safeUrl'

type Props = {
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  iconRight?: React.ReactNode
} & ComponentProps<'button'>

export function Button({ href, variant = 'primary', size = 'md', fullWidth, iconRight, children, className = '', ...props }: Props) {
  const classes = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`
  const content = <>{children}{iconRight ? <span className="btn-icon">{iconRight}</span> : null}</>
  if (href) return <Link href={safeHref(href)} className={classes}>{content}</Link>
  return <button className={classes} {...props}>{content}</button>
}
