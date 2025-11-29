type BeforeChangeArgs = {
  data: {
    paymentDate?: string
    dueDate?: string
    [key: string]: any
  }
  operation: 'create' | 'update'
  originalDoc?: {
    paymentDate?: string
    [key: string]: any
  }
}

/**
 * Sprawdza, czy należy zaktualizować dueDate
 */
export function shouldUpdateDueDate(
  operation: 'create' | 'update',
  paymentDate: string | undefined,
  originalPaymentDate?: string | undefined,
): boolean {
  if (operation === 'create') {
    return true
  }

  if (operation === 'update') {
    return paymentDate !== undefined && paymentDate !== originalPaymentDate
  }

  return false
}

/**
 * Oblicza termin płatności (dueDate) na podstawie daty płatności
 * Jeśli płatność jest przed lub w dniu 10. miesiąca, deadline to 10. dzień bieżącego miesiąca
 * Jeśli płatność jest po 10. dniu miesiąca, deadline to 10. dzień następnego miesiąca
 */
export function calculateDueDate(paymentDate: string): string {
  const date = new Date(paymentDate)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  let dueDate: Date

  if (day <= 10) {
    dueDate = new Date(year, month, 10)
  } else {
    dueDate = new Date(year, month + 1, 10)
  }

  return dueDate.toISOString().split('T')[0]
}

export async function beforeChangePaymentHook({ data, operation, originalDoc }: BeforeChangeArgs) {
  const needsUpdate = shouldUpdateDueDate(operation, data.paymentDate, originalDoc?.paymentDate)

  if (needsUpdate && data.paymentDate) {
    data.dueDate = calculateDueDate(data.paymentDate)
  }

  return data
}
