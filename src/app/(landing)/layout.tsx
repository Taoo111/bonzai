import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import '../globals.css'

export const metadata = {
  title: 'Bonzai MMA Club',
  description: 'Klub MMA Bonzai - Profesjonalne treningi sztuk walki',
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                Bonzai MMA
              </Link>
              <nav className="flex items-center gap-4">
                <Link href="/#o-nas" className="hover:text-primary transition-colors">
                  O nas
                </Link>
                <Link href="/#zajecia" className="hover:text-primary transition-colors">
                  Zajęcia
                </Link>
                <ModeToggle />
                <Link href="/login">
                  <Button variant="outline">Zaloguj się</Button>
                </Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t mt-12">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Bonzai MMA Club. Wszelkie prawa zastrzeżone.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
