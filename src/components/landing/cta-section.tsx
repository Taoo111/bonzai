'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function CTASection() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation()

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-24 sm:py-32 bg-black relative overflow-hidden transition-all duration-700 ease-out ${
        sectionVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          ref={headerRef as React.RefObject<HTMLElement>}
          className={`transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0 delay-100'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: headerVisible ? '100ms' : '0ms' }}
        >
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            Gotowy na zmianę?
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Rozpocznij swoją <br />
            <span className="text-zinc-500">drogę wojownika</span>
          </h2>
        </div>
        <p
          ref={textRef as React.RefObject<HTMLElement>}
          className={`text-zinc-400 text-lg max-w-2xl mx-auto mb-10 transition-all duration-700 ease-out ${
            textVisible
              ? 'opacity-100 translate-y-0 delay-200'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: textVisible ? '200ms' : '0ms' }}
        >
          Pierwszy trening gratis. Przekonaj się sam, dlaczego Bonzai MMA to najlepszy wybór dla
          Ciebie.
        </p>
        <div
          ref={buttonsRef as React.RefObject<HTMLElement>}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out ${
            buttonsVisible
              ? 'opacity-100 translate-y-0 delay-300'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: buttonsVisible ? '300ms' : '0ms' }}
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-zinc-200 font-bold text-base px-10 py-6 uppercase tracking-wider group"
            >
              Umów darmowy trening
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-500 font-medium text-base px-10 py-6 uppercase tracking-wider bg-transparent"
          >
            Kontakt
          </Button>
        </div>
      </div>
    </section>
  )
}
