import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, CreditCard, User } from 'lucide-react'

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

  // Pobierz najnowszą subskrypcję użytkownika
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

  // Formatuj datę zakończenia
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Brak danych'
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Witaj, {user.firstName}!</h1>
        <p className="text-muted-foreground">Oto przegląd Twojego konta w klubie Bonzai MMA</p>
      </div>

      {/* Subscription Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Status karnetu</CardTitle>
              <CardDescription>Informacje o Twoim aktualnym karnecie</CardDescription>
            </div>
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Aktywny' : 'Nieaktywny'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSubscription ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Data zakończenia:</span>
                <span className="font-medium">
                  {formatDate(activeSubscription.endDate as string)}
                </span>
              </div>
              {activeSubscription.startDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Data rozpoczęcia:</span>
                  <span className="font-medium">
                    {formatDate(activeSubscription.startDate as string)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">
              Nie masz aktywnego karnetu. Skontaktuj się z administracją, aby przedłużyć
              członkostwo.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Szybkie akcje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/payment">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle className="text-lg">Zgłoś płatność</CardTitle>
                </div>
                <CardDescription>Zgłoś dokonaną płatność za karnet</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/profile">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <CardTitle className="text-lg">Mój profil</CardTitle>
                </div>
                <CardDescription>Zarządzaj danymi swojego konta</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/dashboard/attendance">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-lg">Moja obecność</CardTitle>
                </div>
                <CardDescription>Zobacz historię swoich treningów</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informacje o koncie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Telefon:</span>
            <span className="font-medium">{user.phone || 'Nie podano'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rola:</span>
            <Badge variant="outline">
              {user.role === 'member'
                ? 'Członek'
                : user.role === 'trainer'
                  ? 'Trener'
                  : 'Administrator'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
