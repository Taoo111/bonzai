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
        <CardTitle className="text-lg font-semibold">Recent History</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Activity</TableHead>
                <TableHead className="text-muted-foreground text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    {activity.icon}
                    <span className="text-foreground">{activity.title}</span>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatRelativeDate(activity.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-4">Brak aktywności</p>
        )}
      </CardContent>
    </Card>
  )
}

