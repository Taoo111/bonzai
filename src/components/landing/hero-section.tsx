import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Witaj w Bonzai MMA Club</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Profesjonalne treningi sztuk walki dla każdego. Dołącz do naszej społeczności i rozwijaj
        swoje umiejętności.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/register">
          <Button size="lg">Dołącz teraz</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">
            Zaloguj się
          </Button>
        </Link>
      </div>
    </section>
  )
}

