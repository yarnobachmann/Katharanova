'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import type { FAQ } from '@/lib/types'

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState(-1)
  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const active = open === index
        return (
          <div className={`faq-item ${active ? 'faq-item-open' : ''}`} key={item.question}>
            <button type="button" aria-expanded={active} onClick={() => setOpen(active ? -1 : index)}>
              <span>{item.question}</span>
              <ChevronDown size={18} />
            </button>
            <div className="faq-panel">
              <div className="faq-panel-inner"><p>{item.answer}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
