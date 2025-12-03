// Utility functions for dashboard components

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Brak danych'
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Dzisiaj'
  if (diffDays === 1) return '1 dzień temu'
  if (diffDays < 7) return `${diffDays} dni temu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tygodni temu`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} miesięcy temu`
  return `${Math.floor(diffDays / 365)} lat temu`
}

export function formatPaymentMethod(method: string | undefined): string {
  if (!method) return 'Brak'
  const methods: Record<string, string> = {
    cash: 'Gotówka',
    transfer: 'Przelew',
    card: 'Karta',
  }
  return methods[method] || method
}

