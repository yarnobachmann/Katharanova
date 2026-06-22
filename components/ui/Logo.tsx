import Image from 'next/image'
import Link from 'next/link'

export function Logo({ mark = '/assets/logo-phoenix-mark.png', full = '/assets/logo-phoenix-full.png', light = false }: { mark?: string; full?: string; light?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Kathara Nova home">
      <Image src={mark || full} alt="" width={52} height={52} className="logo-mark" priority />
      <span className="logo-word" data-light={light}>Kathara Nova</span>
    </Link>
  )
}
