import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrainingLevel, TRAINING_LEVEL_LABELS, TRAINING_LEVEL_COLORS } from '@/enums/training-level'

const DAY_NAMES: Record<string, string> = {
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
}

interface DashboardScheduleProps {
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
  trainingClassesMap: Map<
    number,
    { name: string; color?: string | null; level?: TrainingLevel | string | null }
  >
}

export function DashboardSchedule({ schedule, trainingClassesMap }: DashboardScheduleProps) {
  if (!schedule?.days || schedule.days.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Harmonogram zajęć
        </h2>
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent>
            <p className="text-zinc-500 text-center py-4">Brak harmonogramu</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        Harmonogram zajęć
      </h2>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-800">
            {schedule.days.map((day) => {
              const dayName = DAY_NAMES[day.name] || day.name
              return (
                <div
                  key={day.id || day.name}
                  className="p-4 hover:bg-zinc-800/30 transition-colors"
                >
                  <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                    {dayName}
                  </h3>
                  {day.classes && day.classes.length > 0 ? (
                    <div className="space-y-2">
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
                            className="flex items-center gap-3 p-2 rounded-md bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-[80px]">
                              <span className="text-xs font-medium text-zinc-300">
                                {classItem.startTime}
                              </span>
                              <span className="text-xs text-zinc-600">- {classItem.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              {trainingClass?.color && (
                                <div
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: trainingClass.color }}
                                />
                              )}
                              <span className="text-sm text-white">
                                {trainingClass?.name || 'Zajęcia'}
                              </span>
                            </div>
                            {trainingClass?.level && (
                              <Badge
                                variant="outline"
                                className={`${TRAINING_LEVEL_COLORS[trainingClass.level as TrainingLevel]} text-[10px] px-2 py-0 shrink-0`}
                              >
                                {TRAINING_LEVEL_LABELS[trainingClass.level as TrainingLevel]}
                              </Badge>
                            )}
                            {trainer && (
                              <span className="text-xs text-zinc-500 hidden sm:inline">
                                {trainer.firstName} {trainer.lastName}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">Brak zajęć</p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
