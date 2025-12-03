import React from 'react'
import Link from 'next/link'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import '../globals.css'

export const metadata = {
  title: 'Autoryzacja - Bonzai MMA Club',
  description: 'Zaloguj się lub zarejestruj',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Theme Toggle w prawym górnym rogu */}
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <Link href="/" className="text-3xl font-bold">
                  Bonzai MMA
                </Link>
              </div>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
