import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
            
            <div className="w-full max-w-md px-4">
              <div className="mb-6 sm:mb-8 text-center">
                <Link href="/" className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer">
                  <Image
                    src="/bonzai_logo.jpg"
                    alt="Bonzai MMA Logo"
                    width={60}
                    height={60}
                    className="rounded-full object-cover shrink-0"
                    priority
                  />
                  <span className="text-2xl sm:text-3xl font-bold">Bonzai MMA</span>
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
