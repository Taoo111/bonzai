import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
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
    <html lang="pl" className="dark">
      <body className="bg-black text-white min-h-screen">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
            <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 shrink-0">
                  <Image
                    src="/bonzai-logo.png"
                    alt="Bonzai MMA Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="font-bold text-lg tracking-tight hidden sm:block text-white">
                  BONZAI MMA
                </span>
              </Link>

              {/* Right side: User Avatar */}
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none focus:ring-2 focus:ring-zinc-600 rounded-full">
                      <Avatar className="h-9 w-9 border-2 border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer">
                        <AvatarFallback className="bg-zinc-800 text-white text-sm">
                          {userInitials || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-zinc-900 border-zinc-700 text-white"
                  >
                    <DropdownMenuLabel className="text-zinc-400">Moje konto</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <DropdownMenuItem
                      asChild
                      className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer"
                    >
                      <Link href="/dashboard/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Ustawienia</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-700" />
                    <form action="/api/users/logout" method="POST">
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer text-red-400 focus:text-red-400"
                      >
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
          <div className="flex-1 px-4 pb-8 pt-4 space-y-6 max-w-2xl mx-auto">{children}</div>
        </div>
      </body>
    </html>
  )
}
