import type { CollectionConfig } from 'payload'

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
      name: 'color',
      type: 'text',
      label: 'Kolor',
      admin: {
        description: 'Kolor dla kalendarza (np. #FF5733 lub hex code)',
      },
    },
  ],
}
