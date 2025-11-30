import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import '../../globals.css'

export const metadata = {
  title: 'Dashboard - Bonzai MMA Club',
  description: 'Panel członka',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  // Przekieruj do logowania jeśli użytkownik nie jest zalogowany
  if (!user) {
    redirect('/login')
  }

  return (
    <html lang="pl">
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/dashboard" className="text-2xl font-bold">
                Bonzai MMA
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.fullName || `${user.firstName} ${user.lastName}`}
                </span>
                <form action="/api/users/logout" method="POST">
                  <Button type="submit" variant="outline" size="sm">
                    Wyloguj
                  </Button>
                </form>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 container mx-auto px-4 py-8">{children}</div>
        </div>
      </body>
    </html>
  )
}
