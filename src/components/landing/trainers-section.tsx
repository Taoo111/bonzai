import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface Trainer {
  id: number | string
  firstName: string
  lastName: string
  nickname?: string | null
  description?: string | null
  profileImage?:
    | {
        url?: string | null
        alt?: string | null
      }
    | number
    | null
}

interface TrainersSectionProps {
  trainers: Trainer[]
}

export function TrainersSection({ trainers }: TrainersSectionProps) {
  if (!trainers || trainers.length === 0) {
    return null
  }

  return (
    <section id="trenerzy" className="py-24 sm:py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            Zespół
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Nasi Trenerzy
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Doświadczeni instruktorzy, którzy pomogą Ci osiągnąć Twoje cele treningowe.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trainers.map((trainer) => {
            const fullName = `${trainer.firstName} ${trainer.lastName}`
            const displayName = trainer.nickname
              ? `${fullName} "${trainer.nickname}"`
              : fullName

            return (
              <Card
                key={trainer.id}
                className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors group"
              >
                <CardContent className="p-0">
                  {/* Trainer Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-zinc-800">
                    {trainer.profileImage &&
                    typeof trainer.profileImage === 'object' &&
                    'url' in trainer.profileImage &&
                    trainer.profileImage.url ? (
                      <Image
                        src={trainer.profileImage.url}
                        alt={
                          (trainer.profileImage.alt as string | undefined) || displayName
                        }
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <span className="text-4xl font-bold">
                          {trainer.firstName[0]}
                          {trainer.lastName[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Trainer Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-zinc-200 transition-colors">
                      {trainer.firstName} {trainer.lastName}
                    </h3>
                    {trainer.nickname && (
                      <p className="text-zinc-400 text-sm font-medium mb-2">
                        &quot;{trainer.nickname}&quot;
                      </p>
                    )}
                    {trainer.description && (
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                        {trainer.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

