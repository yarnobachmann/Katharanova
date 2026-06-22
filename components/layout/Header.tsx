'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import type { Navigation, SiteSettings } from '@/lib/types'

export function Header({ settings, navigation }: { settings: SiteSettings; navigation: Navigation }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>('treatments')

  const treatmentItems = navigation.treatmentItems?.length
    ? navigation.treatmentItems
    : navigation.navItems.filter((item) => ['/transhealing', '/opstelling', '/innerlijk-werk'].includes(item.href))
  const practiceItems = navigation.navItems.filter((item) =>
    ['/over-mij', '/tarieven', '/contact'].includes(item.href)
  )
  const primaryItems = navigation.navItems.filter((item) =>
    ['/', '/workshops', '/blog'].includes(item.href)
  )
  const treatmentActive = treatmentItems.some((item) => pathname === item.href)
  const practiceActive = practiceItems.some((item) => pathname === item.href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setDesktopDropdown(null)
    setMobileDropdown('treatments')
  }, [pathname])

  return (
    <header className={`site-header ${scrolled || open ? 'site-header-scrolled' : ''}`}>
      <div className="container-wide header-inner">
        <Logo mark={settings.logoMark} full={settings.logoFull} />
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          {primaryItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>
          ))}
          <NavDropdown
            id="treatments"
            label="Behandelingen"
            items={treatmentItems}
            active={treatmentActive}
            pathname={pathname}
            open={desktopDropdown === 'treatments'}
            setOpen={setDesktopDropdown}
          />
          <NavDropdown
            id="practice"
            label="Praktijk"
            items={practiceItems}
            active={practiceActive}
            pathname={pathname}
            open={desktopDropdown === 'practice'}
            setOpen={setDesktopDropdown}
          />
        </nav>
        <div className="header-actions">
          <div className="desktop-cta"><Button href={navigation.ctaHref} size="sm" className="header-appointment-btn">{navigation.ctaLabel}</Button></div>
          <button className="mobile-trigger" type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? 'mobile-menu-open' : ''}`}>
        {primaryItems.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>
        ))}
        <MobileDropdown
          id="treatments"
          label="Behandelingen"
          items={treatmentItems}
          pathname={pathname}
          active={treatmentActive}
          open={mobileDropdown === 'treatments'}
          setOpen={setMobileDropdown}
        />
        <MobileDropdown
          id="practice"
          label="Praktijk"
          items={practiceItems}
          pathname={pathname}
          active={practiceActive}
          open={mobileDropdown === 'practice'}
          setOpen={setMobileDropdown}
        />
        <Button href={navigation.ctaHref} fullWidth>{navigation.ctaLabel}</Button>
      </div>
    </header>
  )
}

function MobileDropdown({
  id,
  label,
  items,
  pathname,
  active,
  open,
  setOpen
}: {
  id: string
  label: string
  items: { label: string; href: string }[]
  pathname: string
  active: boolean
  open: boolean
  setOpen: (id: string | null) => void
}) {
  return (
    <div className={`mobile-dropdown ${open ? 'mobile-dropdown-open' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(open ? null : id)} className={active ? 'active' : ''}>
        <span>{label}</span>
        <ChevronDown size={17} />
      </button>
      <div className="mobile-dropdown-panel">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>
        ))}
      </div>
    </div>
  )
}

function NavDropdown({
  id,
  label,
  items,
  active,
  pathname,
  open,
  setOpen
}: {
  id: string
  label: string
  items: { label: string; href: string }[]
  active: boolean
  pathname: string
  open: boolean
  setOpen: (id: string | null) => void
}) {
  return (
    <div
      className={`nav-dropdown ${open ? 'nav-dropdown-open' : ''}`}
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
      onFocus={() => setOpen(id)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`nav-dropdown-${id}`}
        className={active ? 'active' : ''}
        onClick={() => setOpen(open ? null : id)}
      >
        {label}
        <ChevronDown size={15} />
      </button>
      <div className="nav-dropdown-panel" id={`nav-dropdown-${id}`} onBlur={(event) => {
        if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(null)
      }}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>
        ))}
      </div>
    </div>
  )
}
