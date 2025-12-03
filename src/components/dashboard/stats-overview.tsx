import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="bg-zinc-900 border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-zinc-400 dark:text-zinc-400">
            Attendance this month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{attendanceCount}</div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-zinc-400 dark:text-zinc-400">
            Last Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lastPayment ? (
            <div>
              <div className="text-2xl font-bold">{lastPayment.amount} PLN</div>
              <div className="text-sm text-zinc-400 dark:text-zinc-400 mt-1">
                {formatPaymentMethod(lastPayment.paymentMethod)}
              </div>
            </div>
          ) : (
            <div className="text-zinc-500 dark:text-zinc-500">Brak danych</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

