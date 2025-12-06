import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatRelativeDate } from './utils'

interface Activity {
  type: 'training' | 'payment'
  title: string
  date: string
  icon: React.ReactNode
}

interface RecentHistoryProps {
  activities: Activity[]
}

export function RecentHistory({ activities }: RecentHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg font-semibold">Ostatnia aktywność</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground text-sm">Aktywność</TableHead>
                  <TableHead className="text-muted-foreground text-right text-sm">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center gap-2">
                      <span className="shrink-0">{activity.icon}</span>
                      <span className="text-foreground text-sm sm:text-base truncate">
                        {activity.title}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                      {formatRelativeDate(activity.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4 text-sm sm:text-base">
            Brak aktywności
          </p>
        )}
      </CardContent>
    </Card>
  )
}

