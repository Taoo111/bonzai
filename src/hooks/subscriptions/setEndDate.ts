type BeforeChangeArgs = {
  data: {
    startDate?: string
    endDate?: string
    [key: string]: any
  }
  operation: 'create' | 'update'
  originalDoc?: {
    startDate?: string
    [key: string]: any
  }
}

/**
 * Sprawdza, czy należy zaktualizować endDate
 */
export function shouldUpdateEndDate(
  operation: 'create' | 'update',
  startDate: string | undefined,
  originalStartDate?: string | undefined,
): boolean {
  if (operation === 'create') {
    return true
  }

  if (operation === 'update') {
    return startDate !== undefined && startDate !== originalStartDate
  }

  return false
}

/**
 * Oblicza datę zakończenia karnetu (endDate) na podstawie daty rozpoczęcia
 * EndDate to zawsze 10. dzień kolejnego miesiąca od startDate
 */
export function calculateEndDate(startDate: string): string {
  const date = new Date(startDate)
  const year = date.getFullYear()
  const month = date.getMonth()

  // 10. dzień kolejnego miesiąca
  const endDate = new Date(year, month + 1, 10)

  return endDate.toISOString().split('T')[0]
}

export async function beforeChangeSubscriptionHook({
  data,
  operation,
  originalDoc,
}: BeforeChangeArgs) {
  const needsUpdate = shouldUpdateEndDate(operation, data.startDate, originalDoc?.startDate)

  if (needsUpdate && data.startDate) {
    data.endDate = calculateEndDate(data.startDate)
  }

  return data
}
