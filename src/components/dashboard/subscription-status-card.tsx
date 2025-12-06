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
          ? 'border-green-500/50 dark:border-green-500/50 bg-card shadow-lg shadow-green-500/10 dark:shadow-green-500/10'
          : 'border-red-500/50 dark:border-red-500/50 bg-card shadow-lg shadow-red-500/10 dark:shadow-red-500/10'
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold mb-1">
              Status:{' '}
              <span className={isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {isActive ? 'AKTYWNY' : 'WYGASŁY'}
              </span>
            </CardTitle>
            {endDate && (
              <CardDescription className="mt-1">
                Ważny do: {formatDate(endDate)}
              </CardDescription>
            )}
          </div>
          {!isActive && (
            <Button asChild className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white">
              <Link href="/dashboard/payment">Odnów teraz</Link>
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

