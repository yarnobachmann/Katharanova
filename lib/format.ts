export function formatDate(date: string) {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

export function shortDate(date: string) {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short' }).format(new Date(date))
}

export function workshopDateLabel(date?: string, fallback = 'Op aanvraag') {
  return date ? formatDate(date) : fallback
}

export function shortWorkshopDateLabel(date?: string, fallback = 'Op aanvraag') {
  return date ? shortDate(date) : fallback
}

