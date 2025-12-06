import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, CreditCard, Upload } from 'lucide-react'

export function QuickActions() {
  const actions = [
    { icon: CreditCard, label: 'Zapłać za karnet', href: '/dashboard/payment' },
    { icon: Upload, label: 'Prześlij potwierdzenie', href: '/dashboard/payment/upload' },
    { icon: Calendar, label: 'Harmonogram zajęć', href: '/dashboard/schedule' },
  ]

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        Szybkie akcje
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            asChild
            variant="outline"
            className="h-auto flex-col gap-2 py-4 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white transition-all"
          >
            <Link href={action.href} className="flex flex-col items-center gap-2">
              <action.icon className="h-5 w-5 text-zinc-400 shrink-0" />
              <span className="text-xs font-medium text-zinc-300 text-center leading-tight">
                {action.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </section>
  )
}
