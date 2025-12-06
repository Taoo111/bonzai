import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CreditCard, CheckCircle } from 'lucide-react'
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

const iconMap = {
  training: Calendar,
  payment: CreditCard,
}

export function RecentHistory({ activities }: RecentHistoryProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        Ostatnia aktywność
      </h2>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          {activities.length > 0 ? (
            <ul className="divide-y divide-zinc-800">
              {activities.map((activity, index) => {
                const IconComponent = iconMap[activity.type] || CheckCircle
                return (
                  <li
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                      <IconComponent className="h-4 w-4 text-zinc-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                      <p className="text-xs text-zinc-500">{formatRelativeDate(activity.date)}</p>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 text-xs shrink-0"
                    >
                      {activity.type === 'training' ? 'trening' : 'płatność'}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-zinc-500 text-center py-4 text-sm">Brak aktywności</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
