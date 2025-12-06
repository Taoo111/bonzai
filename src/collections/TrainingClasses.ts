import type { CollectionConfig } from 'payload'
import { TrainingLevel, TRAINING_LEVEL_LABELS } from '../enums/training-level'

const LEVEL_OPTIONS = Object.values(TrainingLevel).map((level) => ({
  label: TRAINING_LEVEL_LABELS[level],
  value: level,
}))

export const TrainingClasses: CollectionConfig = {
  slug: 'training-classes',
  labels: {
    singular: 'Rodzaj Zajęć',
    plural: 'Rodzaje Zajęć',
  },
  admin: {
    useAsTitle: 'name',
    description: 'Rodzaje treningów dostępnych w klubie',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nazwa',
      admin: {
        description: 'Nazwa rodzaju zajęć (np. MMA, BJJ, Muay Thai)',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      label: 'Poziom zaawansowania',
      options: LEVEL_OPTIONS,
      admin: {
        description: 'Poziom zaawansowania dla tego rodzaju zajęć',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Kolor',
      admin: {
        description: 'Kolor dla kalendarza (np. #FF5733 lub hex code)',
      },
    },
  ],
}
