import Link from 'next/link'

import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container not-found-inner">
        <p className="eyebrow">Pagina niet gevonden</p>
        <h1>Deze pagina bestaat niet of is verplaatst.</h1>
        <p>
          Keer rustig terug naar de homepage of neem contact op als je ergens naar op zoek was.
        </p>
        <div className="not-found-actions">
          <Button href="/">Terug naar home</Button>
          <Link href="/contact">Contact opnemen</Link>
        </div>
      </div>
    </main>
  )
}
