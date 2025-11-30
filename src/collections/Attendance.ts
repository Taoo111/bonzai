import type { CollectionConfig } from 'payload'
import { UserRole } from '../enums/user-role'

export const Attendance: CollectionConfig = {
  slug: 'attendance',
  labels: {
    singular: 'Obecność',
    plural: 'Lista obecności',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['trainingDate', 'trainer', 'trainingClass'],
    description: 'Lista obecności na treningach',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'trainingClass',
      type: 'relationship',
      relationTo: 'training-classes',
      required: true,
      label: 'Rodzaj zajęć',
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
      name: 'attendees',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: true,
      label: 'Obecni',
      filterOptions: {
        role: {
          equals: UserRole.Member,
        },
      },
      admin: {
        description: 'Lista członków obecnych na treningu',
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
