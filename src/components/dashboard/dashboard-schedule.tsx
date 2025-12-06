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
  trainingClassesMap: Map<number, { name: string; color?: string | null }>
}

export function DashboardSchedule({ schedule, trainingClassesMap }: DashboardScheduleProps) {
  if (!schedule?.days || schedule.days.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Harmonogram zajęć</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Brak harmonogramu</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Harmonogram zajęć</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.days.map((day) => {
            const dayName = DAY_NAMES[day.name] || day.name
            return (
              <div key={day.id || day.name} className="border-b last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-semibold text-foreground mb-2">{dayName}</h3>
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
                          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {classItem.startTime}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              - {classItem.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            {trainingClass?.color && (
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: trainingClass.color }}
                              />
                            )}
                            <span className="text-sm text-foreground">
                              {trainingClass?.name || 'Zajęcia'}
                            </span>
                          </div>
                          {trainer && (
                            <span className="text-xs text-muted-foreground">
                              {trainer.firstName} {trainer.lastName}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Brak zajęć</p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

