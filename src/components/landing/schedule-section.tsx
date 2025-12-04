import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  trainingClassesMap: Map<number, { name: string; color?: string | null }>
}

export function ScheduleSection({ schedule, trainingClassesMap }: ScheduleSectionProps) {
  if (!schedule?.days || schedule.days.length === 0) {
    return null
  }

  return (
    <section id="harmonogram" className="container mx-auto px-4 py-16 bg-muted/50">
      <h2 className="text-3xl font-bold text-center mb-12">Harmonogram zajęć</h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {schedule.days.map((day) => {
            const dayName = DAY_NAMES[day.name] || day.name
            return (
              <Card key={day.id || day.name} className="overflow-hidden">
                <CardHeader className="bg-card border-b">
                  <CardTitle className="text-xl">{dayName}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {day.classes && day.classes.length > 0 ? (
                    <div className="space-y-3">
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
                            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-center gap-4 flex-1 flex-wrap">
                              <div className="flex flex-col min-w-[120px]">
                                <span className="font-semibold text-foreground">
                                  {classItem.startTime}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  - {classItem.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                                {trainingClass?.color && (
                                  <div
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ backgroundColor: trainingClass.color }}
                                  />
                                )}
                                <span className="font-medium text-foreground">
                                  {trainingClass?.name || 'Zajęcia'}
                                </span>
                              </div>
                              {trainer && (
                                <span className="text-sm text-muted-foreground">
                                  {trainer.firstName} {trainer.lastName}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Brak zajęć w tym dniu
                    </p>
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

