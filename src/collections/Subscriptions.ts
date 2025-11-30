import type { CollectionConfig } from 'payload'
import { SubscriptionStatus } from '../enums/subscription-status'
import { beforeChangeSubscriptionHook } from '../hooks/subscriptions/setEndDate'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  labels: {
    singular: 'Karnet',
    plural: 'Karnety',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['member', 'startDate', 'endDate', 'status', 'payment'],
    description: 'Karnety członkowskie - ważność członkostwa',
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
        description: 'Członek posiadający karnet',
      },
    },
    {
      name: 'payment',
      type: 'relationship',
      relationTo: 'payments',
      required: true,
      label: 'Płatność',
      admin: {
        description: 'Płatność powiązana z tym karnetem',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString().split('T')[0],
      label: 'Data rozpoczęcia',
      admin: {
        description: 'Data rozpoczęcia karnetu',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      label: 'Data zakończenia',
      admin: {
        description: 'Data zakończenia karnetu (10. dzień kolejnego miesiąca)',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: SubscriptionStatus.Active,
      label: 'Status',
      options: [
        {
          label: 'Aktywny',
          value: SubscriptionStatus.Active,
        },
        {
          label: 'Nieaktywny',
          value: SubscriptionStatus.Inactive,
        },
      ],
      admin: {
        description: 'Status karnetu',
      },
    },
    {
      name: 'autoRenew',
      type: 'checkbox',
      defaultValue: false,
      label: 'Automatyczne odnowienie',
      admin: {
        description: 'Automatyczne odnowienie karnetu',
      },
    },
  ],
  hooks: {
    beforeChange: [beforeChangeSubscriptionHook],
  },
}
