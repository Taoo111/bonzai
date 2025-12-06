import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Calendar, CreditCard } from 'lucide-react'
import { SubscriptionStatusCard } from '@/components/dashboard/subscription-status-card'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { RecentHistory } from '@/components/dashboard/recent-history'
import { DashboardSchedule } from '@/components/dashboard/dashboard-schedule'

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
      title: `Trening: ${trainingClass?.name || 'Trening'}`,
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
      title: `Płatność: ${statusLabel}`,
      date: payment.paymentDate as string,
      icon: <CreditCard className="h-4 w-4" />,
    })
  }

  // Sortuj po dacie i weź 3 najnowsze
  recentActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const last3Activities = recentActivities.slice(0, 3)

  // Pobierz harmonogram
  const schedule = await payload.findGlobal({
    slug: 'schedule',
    depth: 2, // Pobierz relacje (trainingClass, trainer)
  })

  // Pobierz wszystkie rodzaje zajęć dla mapy
  const { docs: trainingClasses } = await payload.find({
    collection: 'training-classes',
    limit: 100,
  })

  // Utwórz mapę training classes dla szybkiego dostępu
  const trainingClassesMap = new Map(
    trainingClasses.map((tc) => [tc.id, { name: tc.name, color: tc.color }]),
  )

  return (
    <div className="space-y-6">
      <SubscriptionStatusCard
        isActive={isActive}
        endDate={activeSubscription?.endDate as string | undefined}
      />

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsOverview
          attendanceCount={attendanceCount}
          lastPayment={
            lastPayment
              ? { amount: lastPayment.amount, paymentMethod: lastPayment.paymentMethod as string }
              : null
          }
        />

        <RecentHistory activities={last3Activities} />
      </div>

      <DashboardSchedule schedule={schedule} trainingClassesMap={trainingClassesMap} />
    </div>
  )
}
