import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Witaj w Bonzai MMA Club
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Profesjonalne treningi sztuk walki dla każdego. Dołącz do naszej społeczności i rozwijaj
        swoje umiejętności.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
        <Link href="/register" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto">
            Dołącz teraz
          </Button>
        </Link>
        <Link href="/login" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Zaloguj się
          </Button>
        </Link>
      </div>
    </section>
  )
}

