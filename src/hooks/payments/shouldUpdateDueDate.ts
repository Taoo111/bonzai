import { Payment } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Oblicza termin płatności (dueDate) na podstawie daty płatności
 * Logika:
 * <= 10 dzień miesiąca -> 10. dzień bieżącego miesiąca
 * > 10 dzień miesiąca -> 10. dzień następnego miesiąca
 */
export function calculateDueDate(paymentDateStr: string): string {
  const date = new Date(paymentDateStr)

  // Używamy metod UTC, aby uniknąć problemów ze strefami czasowymi serwera
  const day = date.getUTCDate()
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()

  // Tworzymy nową datę w UTC (rok, miesiąc, dzień, godz, min...)
  // Jeśli dzień <= 10, to ten miesiąc (month), jeśli nie, to następny (month + 1)
  // JS sam ogarnie, że month + 1 dla Grudnia to Styczeń kolejnego roku
  const targetMonth = day <= 10 ? month : month + 1

  const dueDate = new Date(Date.UTC(year, targetMonth, 10))

  return dueDate.toISOString().split('T')[0]
}

export const beforeChangePaymentHook: CollectionBeforeChangeHook<Payment> = async ({
  data,
  originalDoc,
  operation,
}) => {
  // 1. Pobieramy nową datę płatności (lub starą, jeśli nie jest zmieniana w tym requeście)
  // To ważne przy metodzie PATCH (update), gdzie data.paymentDate może być undefined
  const paymentDate = data.paymentDate || originalDoc?.paymentDate

  // 2. Jeśli nie ma daty płatności (teoretycznie niemożliwe przy required: true), nic nie rób
  if (!paymentDate) {
    return data
  }

  // 3. Sprawdzamy czy musimy przeliczyć (tylko przy create lub gdy data się zmieniła)
  const isNew = operation === 'create'
  const isChanged =
    operation === 'update' &&
    data.paymentDate !== undefined &&
    data.paymentDate !== originalDoc?.paymentDate

  if (isNew || isChanged) {
    data.dueDate = calculateDueDate(paymentDate)
  }

  return data
}
