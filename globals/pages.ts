import type { GlobalConfig } from 'payload'

import { admins } from '@/lib/payload/access'
import { previewForGlobal } from '@/lib/payload/preview'

const heroFields = [
  { name: 'eyebrow', label: 'Label boven titel', type: 'text' as const },
  { name: 'title', label: 'Titel', type: 'text' as const },
  { name: 'intro', label: 'Intro tekst', type: 'textarea' as const },
  { name: 'image', label: 'Hero afbeelding', type: 'upload' as const, relationTo: 'media' as const }
]

const iconOptions = [
  { label: 'Klok', value: 'clock' },
  { label: 'E-mail', value: 'mail' },
  { label: 'Hart', value: 'heart' },
  { label: 'Hart handen', value: 'heart-handshake' },
  { label: 'Locatie', value: 'map-pin' },
  { label: 'Schild', value: 'shield' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Telefoon', value: 'phone' },
  { label: 'Gebruikers', value: 'users' }
]

const ctaFields = [
  { name: 'title', label: 'Titel', type: 'text' as const },
  { name: 'text', label: 'Tekst', type: 'textarea' as const },
  { name: 'primaryLabel', label: 'Primaire knoptekst', type: 'text' as const },
  { name: 'primaryHref', label: 'Primaire knoplink', type: 'text' as const },
  { name: 'secondaryLabel', label: 'Secundaire knoptekst', type: 'text' as const },
  { name: 'secondaryHref', label: 'Secundaire knoplink', type: 'text' as const }
]

const publicEditable = { read: () => true, update: admins }

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('homepage') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: {
        initCollapsed: false,
        description: 'Alles wat bovenaan de homepage in de hero staat.'
      },
      fields: [
        { name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields },
        { name: 'heroChipText', label: 'Tekst in klein hero kaartje', type: 'text' },
        {
          name: 'heroMetaItems',
          label: 'Hero informatie regels',
          type: 'array',
          admin: { description: 'Bijvoorbeeld: Online & op locatie, Sessies 60-90 min.' },
          fields: [
            { name: 'icon', label: 'Icoon', type: 'select', defaultValue: 'map-pin', options: iconOptions },
            { name: 'label', label: 'Tekst', type: 'text', required: true },
            { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 }
          ]
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Herken je dit',
      fields: [
        { name: 'recognitionTitle', label: 'Titel', type: 'text' },
        { name: 'recognitionIntro', label: 'Intro', type: 'textarea' },
        { name: 'recognitionItems', label: 'Punten', type: 'array', fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }] }
      ]
    },
    {
      type: 'collapsible',
      label: 'Behandelingen preview',
      fields: [
        { name: 'treatmentsEyebrow', label: 'Label', type: 'text' },
        { name: 'treatmentsTitle', label: 'Titel', type: 'text', admin: { description: 'De kaarten zelf komen uit de collectie Behandelingen.' } },
        { name: 'treatmentsIntro', label: 'Intro', type: 'textarea' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Over mij preview',
      fields: [
        { name: 'aboutEyebrow', label: 'Label', type: 'text' },
        { name: 'aboutTitle', label: 'Titel', type: 'text' },
        { name: 'aboutText', label: 'Tekst', type: 'textarea' },
        { name: 'aboutImage', label: 'Afbeelding', type: 'upload', relationTo: 'media' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Quote',
      fields: [
        { name: 'quote', label: 'Quote', type: 'textarea' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Workshops preview',
      fields: [
        { name: 'workshopPreviewEyebrow', label: 'Label', type: 'text' },
        { name: 'workshopPreviewTitle', label: 'Titel', type: 'text', admin: { description: 'De kaarten zelf komen uit de collectie Workshops.' } },
        { name: 'workshopPreviewIntro', label: 'Intro', type: 'textarea' }
      ]
    },
    {
      type: 'collapsible',
      label: 'CTA onderaan',
      fields: [
        { name: 'cta', label: 'CTA', type: 'group', fields: ctaFields }
      ]
    }
  ]
}

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  label: 'Fotogallerij pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('gallery-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    }
  ]
}

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Over mij pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('about-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    },
    {
      type: 'collapsible',
      label: 'Portret en cijfers',
      fields: [
        { name: 'portrait', label: 'Portret', type: 'upload', relationTo: 'media' },
        { name: 'stats', label: 'Cijfers', type: 'array', fields: [{ name: 'value', label: 'Waarde', type: 'text' }, { name: 'label', label: 'Label', type: 'text' }] }
      ]
    },
    {
      type: 'collapsible',
      label: 'Introductie',
      fields: [
        { name: 'introTitle', label: 'Titel', type: 'text' },
        { name: 'intro', label: 'Tekst', type: 'richText' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Mijn visie',
      fields: [
        { name: 'visionTitle', label: 'Titel', type: 'text' },
        { name: 'vision', label: 'Tekst', type: 'richText' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Werkwijze',
      fields: [
        { name: 'workingMethodTitle', label: 'Titel', type: 'text' },
        { name: 'workingMethod', label: 'Tekst', type: 'richText' },
        {
          name: 'methodSteps',
          label: 'Werkwijze stappen',
          type: 'array',
          fields: [
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'description', label: 'Omschrijving', type: 'textarea', required: true },
            { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 }
          ]
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Voor wie',
      fields: [
        { name: 'forWhoTitle', label: 'Titel', type: 'text' },
        { name: 'forWho', label: 'Punten', type: 'array', fields: [{ name: 'label', label: 'Tekst', type: 'text', required: true }] }
      ]
    },
    {
      type: 'collapsible',
      label: 'CTA onderaan',
      fields: [{ name: 'cta', label: 'CTA', type: 'group', fields: ctaFields }]
    }
  ]
}

export const WorkshopsPage: GlobalConfig = {
  slug: 'workshops-page',
  label: 'Workshops pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('workshops-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    },
    {
      type: 'collapsible',
      label: 'Waarom een groep',
      fields: [
        { name: 'groupHealingEyebrow', label: 'Label', type: 'text' },
        { name: 'groupHealingTitle', label: 'Titel', type: 'text' },
        { name: 'groupHealingText', label: 'Tekst', type: 'textarea' },
        { name: 'groupHealingItems', label: 'Punten', type: 'array', fields: [{ name: 'icon', label: 'Icoon', type: 'select', defaultValue: 'users', options: iconOptions }, { name: 'title', label: 'Titel', type: 'text' }, { name: 'description', label: 'Omschrijving', type: 'textarea' }] }
      ]
    },
    {
      type: 'collapsible',
      label: 'CTA onderaan',
      fields: [{ name: 'cta', label: 'CTA', type: 'group', fields: ctaFields }]
    }
  ]
}

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('blog-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    },
    {
      type: 'collapsible',
      label: 'CTA onderaan',
      fields: [{ name: 'cta', label: 'CTA', type: 'group', fields: ctaFields }]
    }
  ]
}

export const TarievenPage: GlobalConfig = {
  slug: 'tarieven-page',
  label: 'Tarieven pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('tarieven-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    },
    {
      type: 'collapsible',
      label: 'Goed om te weten',
      admin: {
        description: 'De vragen zelf beheer je via Pagina content > Veelgestelde vragen.'
      },
      fields: [
        { name: 'faqEyebrow', label: 'Label', type: 'text' },
        { name: 'faqTitle', label: 'Titel', type: 'text', admin: { description: 'De vragen zelf komen uit de collectie Veelgestelde vragen.' } },
        { name: 'faqIntro', label: 'Intro', type: 'textarea' }
      ]
    },
    {
      type: 'collapsible',
      label: 'CTA onderaan',
      fields: [{ name: 'cta', label: 'CTA', type: 'group', fields: ctaFields }]
    }
  ]
}

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact pagina',
  admin: { group: 'Pagina content', livePreview: {}, preview: previewForGlobal('contact-page') },
  access: publicEditable,
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      admin: { initCollapsed: false },
      fields: [{ name: 'hero', label: 'Hero tekst en afbeelding', type: 'group', fields: heroFields }]
    },
    {
      type: 'collapsible',
      label: 'Formulier',
      fields: [
        { name: 'formIntro', label: 'Formulier intro', type: 'textarea' },
        { name: 'availabilityText', label: 'Beschikbaarheidstekst', type: 'text' }
      ]
    },
    {
      type: 'collapsible',
      label: 'Contact informatie',
      fields: [
        { name: 'contactCards', label: 'Contact kaartjes', type: 'array', fields: [{ name: 'icon', label: 'Icoon', type: 'select', defaultValue: 'mail', options: iconOptions }, { name: 'label', label: 'Label', type: 'text' }, { name: 'value', label: 'Waarde', type: 'text' }, { name: 'order', label: 'Volgorde', type: 'number', defaultValue: 0 }] }
      ]
    },
    {
      type: 'collapsible',
      label: 'Afbeelding en quote',
      fields: [
        { name: 'image', label: 'Afbeelding', type: 'upload', relationTo: 'media' },
        { name: 'quote', label: 'Quote', type: 'textarea' }
      ]
    }
  ]
}
