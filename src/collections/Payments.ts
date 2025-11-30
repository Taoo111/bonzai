import { PaymentMethodOptions } from '@/enums/payment-method'
import { PaymentStatus } from '@/enums/payment-status'
import type { CollectionConfig } from 'payload'
import { UserRole } from '../enums/user-role'
import { beforeChangePaymentHook } from '../hooks/payments/shouldUpdateDueDate'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Płatność',
    plural: 'Płatności',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['member', 'amount', 'paymentMethod', 'paymentDate', 'dueDate', 'status'],
    description: 'Płatności za karnety',
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
          equals: UserRole.Member,
        },
      },
      admin: {
        description: 'Członek, który dokonał płatności',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      defaultValue: 230,
      label: 'Kwota',
      admin: {
        description: 'Kwota płatności (domyślnie 230 zł)',
        step: 0.01,
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      label: 'Metoda płatności',
      options: PaymentMethodOptions,
      admin: {
        description: 'Metoda płatności',
      },
    },
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString().split('T')[0],
      label: 'Data płatności',
      admin: {
        description: 'Data płatności',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'dueDate',
      type: 'date',
      required: true,
      label: 'Termin płatności',
      admin: {
        description: 'Termin płatności (automatycznie ustawiany na 10. dzień miesiąca)',
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
      defaultValue: PaymentStatus.Completed,
      label: 'Status',
      options: [
        {
          label: 'Zakończona',
          value: PaymentStatus.Completed,
        },
        {
          label: 'Oczekująca',
          value: PaymentStatus.Pending,
        },
        {
          label: 'Anulowana',
          value: PaymentStatus.Cancelled,
        },
      ],
      admin: {
        description: 'Status płatności',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notatki',
      admin: {
        description: 'Notatki dotyczące płatności',
      },
    },
  ],
  hooks: {
    beforeChange: [beforeChangePaymentHook],
  },
}
