'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { TrainingLevel, TRAINING_LEVEL_LABELS, TRAINING_LEVEL_COLORS } from '@/enums/training-level'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const DAY_NAMES: Record<string, string> = {
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
}

interface ScheduleSectionProps {
  schedule: {
    days?: Array<{
      id?: string | null
      name: string
      classes?: Array<{
        id?: string | null
        startTime: string
        endTime: string
        trainingClass: any
        trainer?: any
      }> | null
    }> | null
  } | null
  trainingClassesMap: Map<number, { name: string; level?: TrainingLevel | string | null }>
}

export function ScheduleSection({ schedule, trainingClassesMap }: ScheduleSectionProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  if (!schedule?.days || schedule.days.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="harmonogram"
      className="py-24 sm:py-32 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLElement>}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium mb-4">
            Harmonogram
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            Harmonogram zajęć
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Wybierz zajęcia dopasowane do Twojego poziomu i celów treningowych.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.values(TrainingLevel).map((level) => (
            <Badge
              key={level}
              variant="outline"
              className={`${TRAINING_LEVEL_COLORS[level]} text-xs`}
            >
              {TRAINING_LEVEL_LABELS[level]}
            </Badge>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {schedule.days.map((day, index) => {
            const dayName = DAY_NAMES[day.name] || day.name
            return (
              <Card
                key={day.id || day.name}
                className={`bg-zinc-900/50 border-zinc-800 overflow-hidden transition-all duration-700 ease-out ${
                  sectionVisible
                    ? `opacity-100 translate-y-0 delay-[${index * 100}ms]`
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: sectionVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Day Header */}
                <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-700">
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                    {dayName}
                  </h3>
                </div>

                {/* Classes */}
                <CardContent className="p-0">
                  {day.classes && day.classes.length > 0 ? (
                    <div className="divide-y divide-zinc-800">
                      {day.classes.map((classItem, index) => {
                        const trainingClass =
                          typeof classItem.trainingClass === 'object'
                            ? classItem.trainingClass
                            : trainingClassesMap.get(classItem.trainingClass as number)
                        const trainer =
                          typeof classItem.trainer === 'object' ? classItem.trainer : null

                        return (
                          <div
                            key={classItem.id || index}
                            className="p-4 hover:bg-zinc-800/30 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-3.5 w-3.5 text-zinc-500" />
                              <span className="text-sm font-medium text-zinc-300">
                                {classItem.startTime}
                              </span>
                              <span className="text-xs text-zinc-600">- {classItem.endTime}</span>
                            </div>
                            <p className="font-semibold text-white mb-1 group-hover:text-zinc-200 transition-colors">
                              {trainingClass?.name || 'Zajęcia'}
                            </p>
                            {trainer && (
                              <p className="text-xs text-zinc-500 mb-2">
                                {trainer.firstName} {trainer.lastName}
                              </p>
                            )}
                            {trainingClass?.level && (
                              <Badge
                                variant="outline"
                                className={`${TRAINING_LEVEL_COLORS[trainingClass.level as TrainingLevel]} text-[10px] px-2 py-0`}
                              >
                                {TRAINING_LEVEL_LABELS[trainingClass.level as TrainingLevel]}
                              </Badge>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-center py-4 text-sm">Brak zajęć w tym dniu</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
