import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Shield, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from './utils'

interface SubscriptionStatusCardProps {
  isActive: boolean
  endDate?: string
}

export function SubscriptionStatusCard({ isActive, endDate }: SubscriptionStatusCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden bg-zinc-900/80 border-2 transition-all',
        isActive
          ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]',
      )}
    >
      {/* Subtle gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 opacity-10',
          isActive
            ? 'bg-linear-to-br from-emerald-500 to-transparent'
            : 'bg-linear-to-br from-red-500 to-transparent',
        )}
      />

      <CardContent className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              {isActive ? (
                <Shield className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider">
                Status członkostwa
              </span>
            </div>

            <div className="space-y-1">
              <Badge
                variant="outline"
                className={cn(
                  'text-base sm:text-lg font-bold px-3 py-1 border-2',
                  isActive
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                    : 'border-red-500 text-red-400 bg-red-500/10',
                )}
              >
                {isActive ? 'AKTYWNY' : 'WYGASŁY'}
              </Badge>

              {isActive && endDate && (
                <p className="text-zinc-500 text-xs sm:text-sm">
                  Ważny do: <span className="text-zinc-300">{formatDate(endDate)}</span>
                </p>
              )}
            </div>
          </div>

          {/* Icon decoration */}
          <div
            className={cn(
              'w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0',
              isActive ? 'bg-emerald-500/10' : 'bg-red-500/10',
            )}
          >
            <div
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 rounded-full',
                isActive ? 'bg-emerald-500/30' : 'bg-red-500/30',
              )}
            />
          </div>
        </div>

        {/* CTA for expired state */}
        {!isActive && (
          <Button
            asChild
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            <Link href="/dashboard/payment">Odnów teraz</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
