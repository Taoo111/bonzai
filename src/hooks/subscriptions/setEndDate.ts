import { Subscription } from '@/payload-types'
import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Oblicza datę zakończenia (endDate).
 * Logika: Zawsze 10. dzień następnego miesiąca względem startDate.
 * Używa metod UTC, aby uniknąć przesunięć stref czasowych.
 */
export function calculateEndDate(startDateStr: string): string {
  const date = new Date(startDateStr)

  // Pobieramy rok i miesiąc w UTC
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()

  // Tworzymy nową datę: ten sam rok, miesiąc + 1, dzień 10
  // Date.UTC obsłuży zmianę roku (np. miesiąc 11 (grudzień) + 1 -> styczeń kolejnego roku)
  const endDateTimestamp = Date.UTC(year, month + 1, 10)

  return new Date(endDateTimestamp).toISOString().split('T')[0]
}

export const beforeChangeSubscriptionHook: CollectionBeforeChangeHook<Subscription> = async ({
  data,
  operation,
  originalDoc,
}) => {
  // 1. Sprawdzamy, jaka jest "nowa" data startu.
  // Przy create: bierzemy z data.
  // Przy update: bierzemy z data (jeśli zmieniono) lub null (jeśli nie ruszano pola).
  const incomingStartDate = data.startDate

  // 2. Jeśli to update i nie zmieniamy daty startu, to nie przeliczamy daty końca.
  // Pozwala to Trenerowi ręcznie zmienić endDate (np. wydłużyć komuś karnet gratis),
  // bez automatycznego nadpisywania przez hooka.
  if (operation === 'update' && !incomingStartDate) {
    return data
  }

  // 3. Sprawdzamy czy data się faktycznie zmieniła (lub czy to nowy rekord)
  const hasChanged = incomingStartDate !== originalDoc?.startDate
  const isNew = operation === 'create'

  // Wykonujemy obliczenia tylko jeśli trzeba
  if ((isNew || hasChanged) && incomingStartDate) {
    data.endDate = calculateEndDate(incomingStartDate)
  }

  return data
}
