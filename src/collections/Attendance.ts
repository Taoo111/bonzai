import type { CollectionConfig } from 'payload'

export const Attendance: CollectionConfig = {
  slug: 'attendance',
  labels: {
    singular: 'Obecność',
    plural: 'Lista obecności',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['member', 'trainingDate', 'trainer', 'isPresent'],
    description: 'Lista obecności na treningach',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Członek',
      filterOptions: {
        role: {
          equals: 'member',
        },
      },
      admin: {
        description: 'Członek obecny na treningu',
      },
    },
    {
      name: 'trainingDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Data treningu',
      admin: {
        description: 'Data i godzina treningu',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Trener',
      filterOptions: {
        role: {
          equals: 'trainer',
        },
      },
      admin: {
        description: 'Trener prowadzący trening',
      },
    },
    {
      name: 'isPresent',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Obecny',
      admin: {
        description: 'Zaznacz, jeśli członek był obecny na treningu',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notatki',
      admin: {
        description: 'Notatki dotyczące treningu',
      },
    },
  ],
}
