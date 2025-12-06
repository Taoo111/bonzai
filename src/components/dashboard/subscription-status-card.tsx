import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import { formatDate } from './utils'

interface SubscriptionStatusCardProps {
  isActive: boolean
  endDate?: string
}

export function SubscriptionStatusCard({ isActive, endDate }: SubscriptionStatusCardProps) {
  const accentColor = isActive ? 'green' : 'red'
  const statusText = isActive ? 'AKTYWNY' : 'WYGASŁY'

  return (
    <Card
      className={`border-2 rounded-lg overflow-hidden ${
        isActive
          ? 'border-green-500 bg-linear-to-br from-green-500/10 via-green-500/5 to-transparent dark:from-green-500/20 dark:via-green-500/10 dark:to-transparent'
          : 'border-red-500 bg-linear-to-br from-red-500/10 via-red-500/5 to-transparent dark:from-red-500/20 dark:via-red-500/10 dark:to-transparent'
      }`}
    >
      <CardContent className="p-4 sm:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            {/* Label z ikoną */}
            <div className="flex items-center gap-2 mb-3">
              <Shield
                className={`h-5 w-5 ${isActive ? 'text-green-500' : 'text-red-500'}`}
                strokeWidth={2}
              />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Status członkostwa
              </span>
            </div>

            {/* Badge ze statusem */}
            <div
              className={`inline-flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg mb-3 ${
                isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                {statusText}
              </span>
            </div>

            {/* Data ważności */}
            {endDate && (
              <p className="text-xs sm:text-sm text-muted-foreground">
                Ważny do: {formatDate(endDate)}
              </p>
            )}
          </div>

          {/* Przycisk "Odnów teraz" dla nieaktywnego */}
          {!isActive && (
            <div className="sm:ml-4 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              >
                <Link href="/dashboard/payment">Odnów teraz</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
