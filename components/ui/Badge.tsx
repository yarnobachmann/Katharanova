export function Badge({ children, tone = 'gold' }: { children: React.ReactNode; tone?: 'gold' | 'neutral' | 'solid' | 'sage' | 'clay' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}
