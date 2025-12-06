import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Gotowy na start?</CardTitle>
          <CardDescription>Dołącz do naszej społeczności już dziś</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/register">
            <Button size="lg" className="w-full md:w-auto">
              Zarejestruj się teraz
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}

