import { Card, CardContent } from '@/components/ui/card'
import { CalendarCheck, Banknote } from 'lucide-react'
import { formatPaymentMethod } from './utils'

interface StatsOverviewProps {
  attendanceCount: number
  lastPayment: {
    amount: number
    paymentMethod?: string
  } | null
}

export function StatsOverview({ attendanceCount, lastPayment }: StatsOverviewProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Statystyki</h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Attendance Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="h-4 w-4 text-zinc-500" />
              <span className="text-xs text-zinc-500 font-medium">Obecność w tym miesiącu</span>
            </div>
            <p className="text-3xl font-bold text-white">{attendanceCount}</p>
          </CardContent>
        </Card>

        {/* Last Payment Card */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="h-4 w-4 text-zinc-500" />
              <span className="text-xs text-zinc-500 font-medium">Ostatnia płatność</span>
            </div>
            {lastPayment ? (
              <>
                <p className="text-lg font-bold text-white">{lastPayment.amount} PLN</p>
                <p className="text-xs text-zinc-500">
                  ({formatPaymentMethod(lastPayment.paymentMethod)})
                </p>
              </>
            ) : (
              <p className="text-sm text-zinc-500">Brak danych</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
