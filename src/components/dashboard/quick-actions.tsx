import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, CreditCard, Upload } from 'lucide-react'

export function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 bg-card hover:bg-accent"
        >
          <Link href="/dashboard/payment" className="flex items-center gap-3">
            <CreditCard className="h-5 w-5" />
            <span>Pay Subscription</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 bg-card hover:bg-accent"
        >
          <Link href="/dashboard/payment/upload" className="flex items-center gap-3">
            <Upload className="h-5 w-5" />
            <span>Upload Payment Proof</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="justify-start h-auto py-4 bg-card hover:bg-accent"
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

