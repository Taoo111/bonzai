import React from 'react'
import Link from 'next/link'
import '../globals.css'

export const metadata = {
  title: 'Autoryzacja - Bonzai MMA Club',
  description: 'Zaloguj się lub zarejestruj',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link href="/" className="text-3xl font-bold">
                Bonzai MMA
              </Link>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
