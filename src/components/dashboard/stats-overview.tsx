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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Obecność w tym miesiącu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{attendanceCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Ostatnia płatność
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lastPayment ? (
            <div>
              <div className="text-2xl font-bold text-foreground">{lastPayment.amount} PLN</div>
              <div className="text-sm text-muted-foreground mt-1">
                {formatPaymentMethod(lastPayment.paymentMethod)}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">Brak danych</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

