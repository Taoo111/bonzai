import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bonzai MMA Club',
  description: 'Profesjonalny klub sztuk walki',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="dark">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}

