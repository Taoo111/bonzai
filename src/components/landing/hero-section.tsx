import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Camera } from 'lucide-react'

interface HeroSectionProps {
  videoUrl?: string | null
}

export function HeroSection({ videoUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Video or Image */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/mma-fighter-in-dark-gym-dramatic-lighting-black-an.jpg"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/mma-fighter-in-dark-gym-dramatic-lighting-black-an.jpg')`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Subtitle */}
          <p className="text-zinc-400 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
            Profesjonalny klub sztuk walki
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
            <span className="block">Dyscyplina</span>
            <span className="block text-zinc-500">&</span>
            <span className="block">Siła</span>
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Dołącz do Bonzai MMA i rozwijaj swoje umiejętności pod okiem doświadczonych trenerów.
            Treningi dla każdego poziomu zaawansowania.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 font-bold text-base px-8 py-6 uppercase tracking-wider group"
              >
                Rozpocznij trening
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link
              href="https://www.instagram.com/bonzaimma/?hl=pl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-600 text-white hover:bg-zinc-800 hover:border-zinc-500 font-medium text-base px-8 py-6 uppercase tracking-wider bg-transparent"
              >
                <Camera className="mr-2 h-5 w-5" />
                Instagram
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
