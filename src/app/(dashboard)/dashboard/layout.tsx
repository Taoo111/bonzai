import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import '../../globals.css'

export const metadata = {
  title: 'Dashboard - Bonzai MMA Club',
  description: 'Panel członka',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/login')
  }

  const userInitials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
  const userName = user.fullName || `${user.firstName} ${user.lastName}`

  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b border-border bg-card">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center border-2 border-border">
                    <span className="text-background font-bold text-sm">B</span>
                  </div>
                  <span className="text-xl font-bold tracking-tight">Bonzai MMA</span>
                </Link>

                {/* Right side: Theme Toggle + User Avatar */}
                <div className="flex items-center gap-3">
                  <ModeToggle />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full border border-border hover:bg-accent"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted text-foreground border border-border">
                            {userInitials || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{userName}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/dashboard/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <form action="/api/users/logout" method="POST">
                        <DropdownMenuItem asChild className="cursor-pointer text-destructive">
                          <button type="submit" className="flex items-center w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Wyloguj</span>
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
