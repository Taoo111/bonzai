import type { GlobalConfig } from 'payload'
import { UserRole } from '../enums/user-role'

const DAYS_OF_WEEK = [
  { label: 'Poniedziałek', value: 'monday' },
  { label: 'Wtorek', value: 'tuesday' },
  { label: 'Środa', value: 'wednesday' },
  { label: 'Czwartek', value: 'thursday' },
  { label: 'Piątek', value: 'friday' },
  { label: 'Sobota', value: 'saturday' },
  { label: 'Niedziela', value: 'sunday' },
]

export const Schedule: GlobalConfig = {
  slug: 'schedule',
  label: {
    singular: 'Grafik Zajęć',
    plural: 'Grafik Zajęć',
  },
  access: {
    read: () => true, // Public read access
    update: ({ req: { user } }) => {
      // Only admins can update
      return user?.role === UserRole.Admin
    },
  },
  admin: {
    description: 'Tygodniowy harmonogram zajęć w klubie Bonzai MMA',
  },
  fields: [
    {
      name: 'days',
      type: 'array',
      label: 'Dni Tygodnia',
      required: true,
      minRows: 0,
      maxRows: 7,
      admin: {
        initCollapsed: true,
        description: 'Harmonogram zajęć dla każdego dnia tygodnia',
      },
      fields: [
        {
          name: 'name',
          type: 'select',
          label: 'Dzień tygodnia',
          required: true,
          options: DAYS_OF_WEEK,
          admin: {
            description: 'Wybierz dzień tygodnia',
          },
        },
        {
          name: 'classes',
          type: 'array',
          label: 'Zajęcia',
          required: false,
          minRows: 0,
          admin: {
            description: 'Lista zajęć w danym dniu',
          },
          fields: [
            {
              name: 'startTime',
              type: 'text',
              label: 'Godzina rozpoczęcia',
              required: true,
              admin: {
                description: 'Godzina rozpoczęcia zajęć (format: HH:MM, np. 18:00)',
                placeholder: '18:00',
              },
              validate: (value: string | null | undefined) => {
                if (!value) return 'Godzina rozpoczęcia jest wymagana'

                const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

                if (!timeRegex.test(value)) {
                  return 'Nieprawidłowy format godziny. Użyj formatu HH:MM (np. 18:00)'
                }

                return true
              },
            },
            {
              name: 'endTime',
              type: 'text',
              label: 'Godzina zakończenia',
              required: true,
              admin: {
                description: 'Godzina zakończenia zajęć (format: HH:MM, np. 19:30)',
                placeholder: '19:30',
              },
              validate: (value: string | null | undefined) => {
                if (!value) return 'Godzina zakończenia jest wymagana'

                const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

                if (!timeRegex.test(value)) {
                  return 'Nieprawidłowy format godziny. Użyj formatu HH:MM (np. 19:30)'
                }

                return true
              },
            },
            {
              name: 'trainingClass',
              type: 'relationship',
              relationTo: 'training-classes',
              required: true,
              label: 'Rodzaj zajęć',
              admin: {
                description: 'Wybierz rodzaj zajęć',
              },
            },
            {
              name: 'trainer',
              type: 'relationship',
              relationTo: 'users',
              required: false,
              label: 'Trener',
              filterOptions: {
                role: {
                  equals: UserRole.Trainer,
                },
              },
              admin: {
                description: 'Trener prowadzący zajęcia',
              },
            },
          ],
        },
      ],
    },
  ],
}
