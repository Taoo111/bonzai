import Image from 'next/image'
import { Shield, Users, Trophy, Target } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Bezpieczeństwo',
    description: 'Profesjonalny sprzęt i nadzór trenerski na każdych zajęciach.',
  },
  {
    icon: Users,
    title: 'Społeczność',
    description: 'Dołącz do rodziny zawodników o podobnych celach.',
  },
  {
    icon: Trophy,
    title: 'Doświadczenie',
    description: 'Trenerzy z wieloletnim doświadczeniem zawodniczym.',
  },
  {
    icon: Target,
    title: 'Indywidualne podejście',
    description: 'Treningi dostosowane do Twojego poziomu.',
  },
]

export function AboutSection() {
  return (
    <section id="o-nas" className="py-24 sm:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            O nas
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Witaj w Bonzai MMA
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative aspect-4/5 lg:aspect-3/4 rounded-lg overflow-hidden">
            <Image
              src="/team-bonzai.png"
              alt="Bonzai MMA Training"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
              {[
                { value: '5+', label: 'Lat' },
                { value: '200+', label: 'Członków' },
                { value: '8', label: 'Trenerów' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-zinc-300 text-lg leading-relaxed">
                <span className="text-white font-semibold">Bonzai MMA Club</span> to miejsce, gdzie
                pasja spotyka się z profesjonalizmem. Oferujemy treningi dla osób na każdym poziomie
                zaawansowania.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Nasz zespół doświadczonych trenerów pomoże Ci osiągnąć Twoje cele, niezależnie od
                tego, czy chcesz poprawić kondycję, nauczyć się samoobrony, czy rywalizować na
                najwyższym poziomie.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-zinc-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
