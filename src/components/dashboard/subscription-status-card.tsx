import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate } from './utils'

interface SubscriptionStatusCardProps {
  isActive: boolean
  endDate?: string
}

export function SubscriptionStatusCard({ isActive, endDate }: SubscriptionStatusCardProps) {
  return (
    <Card
      className={`border-2 ${
        isActive
          ? 'border-green-500/50 bg-zinc-900 shadow-lg shadow-green-500/10 dark:border-green-500/50 dark:bg-zinc-900'
          : 'border-red-500/50 bg-zinc-900 shadow-lg shadow-red-500/10 dark:border-red-500/50 dark:bg-zinc-900'
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold mb-1">
              Status:{' '}
              <span className={isActive ? 'text-green-400' : 'text-red-400'}>
                {isActive ? 'ACTIVE' : 'EXPIRED'}
              </span>
            </CardTitle>
            {endDate && (
              <CardDescription className="text-zinc-400 dark:text-zinc-400 mt-1">
                Valid until: {formatDate(endDate)}
              </CardDescription>
            )}
          </div>
          {!isActive && (
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/dashboard/payment">Renew Now</Link>
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

