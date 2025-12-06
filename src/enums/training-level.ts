export enum TrainingLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Kids = 'kids',
}

export const TRAINING_LEVEL_LABELS: Record<TrainingLevel, string> = {
  [TrainingLevel.Beginner]: 'Początkujący',
  [TrainingLevel.Intermediate]: 'Średni',
  [TrainingLevel.Advanced]: 'Zaawansowany',
  [TrainingLevel.Kids]: 'Dzieci',
}

export const TRAINING_LEVEL_COLORS: Record<TrainingLevel, string> = {
  [TrainingLevel.Beginner]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  [TrainingLevel.Intermediate]: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  [TrainingLevel.Advanced]: 'bg-red-500/20 text-red-400 border-red-500/30',
  [TrainingLevel.Kids]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}
