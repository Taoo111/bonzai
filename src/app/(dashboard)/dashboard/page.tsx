import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, CreditCard, Upload, CheckCircle2, Clock } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const metadata = {
  title: 'Dashboard - Bonzai MMA Club',
}

export default async function DashboardPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return null
  }

  // Pobierz najnowszą subskrypcję
  const { docs: subscriptions } = await payload.find({
    collection: 'subscriptions',
    where: {
      member: {
        equals: user.id,
      },
    },
    sort: '-startDate',
    limit: 1,
  })

  const activeSubscription = subscriptions[0] || null
  const subscriptionStatus = activeSubscription?.status || user.subscriptionStatus || 'inactive'
  const isActive = subscriptionStatus === 'active'

  // Pobierz obecność w tym miesiącu
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const { docs: attendanceThisMonth } = await payload.find({
    collection: 'attendance',
    where: {
      and: [
        {
          attendees: {
            contains: user.id,
          },
        },
        {
          trainingDate: {
            greater_than_equal: startOfMonth.toISOString(),
          },
        },
        {
          trainingDate: {
            less_than_equal: endOfMonth.toISOString(),
          },
        },
      ],
    },
    limit: 100,
  })

  const attendanceCount = attendanceThisMonth.length

  // Pobierz ostatnią płatność
  const { docs: payments } = await payload.find({
    collection: 'payments',
    where: {
      member: {
        equals: user.id,
      },
    },
    sort: '-paymentDate',
    limit: 1,
  })

  const lastPayment = payments[0] || null

  // Pobierz ostatnie aktywności (attendance + payments)
  const recentActivities: Array<{
    type: 'training' | 'payment'
    title: string
    date: string
    icon: React.ReactNode
  }> = []

  // Ostatnie 3 treningi
  const { docs: recentAttendance } = await payload.find({
    collection: 'attendance',
    where: {
      attendees: {
        contains: user.id,
      },
    },
    sort: '-trainingDate',
    limit: 3,
  })

  for (const attendance of recentAttendance) {
    const trainingClass =
      typeof attendance.trainingClass === 'object'
        ? attendance.trainingClass
        : await payload.findByID({
            collection: 'training-classes',
            id: attendance.trainingClass as number,
          })

    recentActivities.push({
      type: 'training',
      title: `Training: ${trainingClass?.name || 'Trening'}`,
      date: attendance.trainingDate,
      icon: <Calendar className="h-4 w-4" />,
    })
  }

  // Ostatnie 3 płatności
  const { docs: recentPayments } = await payload.find({
    collection: 'payments',
    where: {
      member: {
        equals: user.id,
      },
    },
    sort: '-paymentDate',
    limit: 3,
  })

  for (const payment of recentPayments) {
    const statusLabel =
      payment.status === 'completed'
        ? 'Zatwierdzona'
        : payment.status === 'pending'
          ? 'Oczekująca'
          : 'Odrzucona'
    recentActivities.push({
      type: 'payment',
      title: `Payment: ${statusLabel}`,
      date: payment.paymentDate as string,
      icon: <CreditCard className="h-4 w-4" />,
    })
  }

  // Sortuj po dacie i weź 3 najnowsze
  recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const last3Activities = recentActivities.slice(0, 3)

  // Formatuj datę
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Brak danych'
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Formatuj datę relatywną
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Dzisiaj'
    if (diffDays === 1) return '1 dzień temu'
    if (diffDays < 7) return `${diffDays} dni temu`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tygodni temu`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} miesięcy temu`
    return `${Math.floor(diffDays / 365)} lat temu`
  }

  // Formatuj metodę płatności
  const formatPaymentMethod = (method: string | undefined) => {
    if (!method) return 'Brak'
    const methods: Record<string, string> = {
      cash: 'Gotówka',
      transfer: 'Przelew',
      card: 'Karta',
    }
    return methods[method] || method
  }

  return (
    <div className="space-y-6">
      {/* Hero Status Card - Most Important Element */}
      <Card
        className={`border-2 ${
          isActive
            ? 'border-green-500/50 bg-zinc-900 shadow-lg shadow-green-500/10'
            : 'border-red-500/50 bg-zinc-900 shadow-lg shadow-red-500/10'
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
              {activeSubscription?.endDate && (
                <CardDescription className="text-zinc-400 mt-1">
                  Valid until: {formatDate(activeSubscription.endDate as string)}
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-zinc-300">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            asChild
            variant="outline"
            className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            <Link href="/dashboard/payment" className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <span>Pay Subscription</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            <Link href="/dashboard/payment/upload" className="flex items-center gap-3">
              <Upload className="h-5 w-5" />
              <span>Upload Payment Proof</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="justify-start h-auto py-4 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
          >
            <Link href="/dashboard/schedule" className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <span>Class Schedule</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Attendance this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{attendanceCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">Last Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {lastPayment ? (
              <div>
                <div className="text-2xl font-bold">{lastPayment.amount} PLN</div>
                <div className="text-sm text-zinc-400 mt-1">
                  {formatPaymentMethod(lastPayment.paymentMethod as string)}
                </div>
              </div>
            ) : (
              <div className="text-zinc-500">Brak danych</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent History */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent History</CardTitle>
        </CardHeader>
        <CardContent>
          {last3Activities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableHead className="text-zinc-400">Activity</TableHead>
                  <TableHead className="text-zinc-400 text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {last3Activities.map((activity, index) => (
                  <TableRow key={index} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="flex items-center gap-2">
                      {activity.icon}
                      <span>{activity.title}</span>
                    </TableCell>
                    <TableCell className="text-right text-zinc-400">
                      {formatRelativeDate(activity.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-zinc-500 text-center py-4">Brak aktywności</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
