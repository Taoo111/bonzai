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
    <Card className="bg-zinc-900 border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent History</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                <TableHead className="text-zinc-400 dark:text-zinc-400">Activity</TableHead>
                <TableHead className="text-zinc-400 dark:text-zinc-400 text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow
                  key={index}
                  className="border-zinc-800 hover:bg-zinc-800/50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <TableCell className="flex items-center gap-2">
                    {activity.icon}
                    <span>{activity.title}</span>
                  </TableCell>
                  <TableCell className="text-right text-zinc-400 dark:text-zinc-400">
                    {formatRelativeDate(activity.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-500 text-center py-4">Brak aktywności</p>
        )}
      </CardContent>
    </Card>
  )
}

