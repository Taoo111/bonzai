import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, CreditCard, Upload } from 'lucide-react'

export function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-zinc-300 dark:text-zinc-300">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white"
        >
          <Link href="/dashboard/payment" className="flex items-center gap-3">
            <CreditCard className="h-5 w-5" />
            <span>Pay Subscription</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white"
        >
          <Link href="/dashboard/payment/upload" className="flex items-center gap-3">
            <Upload className="h-5 w-5" />
            <span>Upload Payment Proof</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white"
        >
          <Link href="/dashboard/schedule" className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            <span>Class Schedule</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

