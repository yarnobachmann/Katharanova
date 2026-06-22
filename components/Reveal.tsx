'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const ease = 'power2.out'

type RevealVariant = 'section' | 'hero' | 'cards' | 'image'

export function Reveal({
  children,
  className = '',
  stagger = false,
  variant = 'section',
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  stagger?: boolean
  variant?: RevealVariant
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      element.classList.add('is-visible')
      return
    }

    const targets = stagger ? Array.from(element.children) : [element]
    const settings = {
      section: { y: 12, scale: 1, duration: 0.82, stagger: 0.07 },
      hero: { y: 16, scale: 1, duration: 0.92, stagger: 0.1 },
      cards: { y: 18, scale: 0.99, duration: 0.95, stagger: 0.105 },
      image: { y: 8, scale: 0.985, duration: 1.05, stagger: 0.04 }
    }[variant]

    gsap.set(targets, {
      autoAlpha: 0,
      y: settings.y,
      scale: settings.scale,
      force3D: true,
      transition: 'none',
      transformOrigin: '50% 60%',
      willChange: 'opacity, transform'
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: settings.duration,
        delay,
        ease,
        stagger: stagger ? settings.stagger : 0,
        overwrite: true,
        onComplete: () => {
          element.classList.add('is-visible')
          gsap.set(targets, { clearProps: 'opacity,visibility,transform,willChange,transition' })
        }
      })
      observer.disconnect()
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [delay, stagger, variant])

  return <div ref={ref} className={`${stagger ? 'stagger' : 'reveal'} reveal-${variant} ${className}`}>{children}</div>
}
