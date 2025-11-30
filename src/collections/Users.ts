import type { CollectionConfig } from 'payload'
import { SubscriptionStatus } from '../enums/subscription-status'
import { UserRole } from '../enums/user-role'
import { populateFullName } from '@/hooks/users/fields/populateFullName'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Użytkownik',
    plural: 'Użytkownicy',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'subscriptionStatus'],
    description: 'Użytkownicy systemu - członkowie, trenerzy i administratorzy',
  },
  auth: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'Imię',
      admin: {
        description: 'Imię członka/trenera',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: 'Nazwisko',
      admin: {
        description: 'Nazwisko członka/trenera',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: false,
        description: 'Pełne imię i nazwisko (generowane automatycznie)',
      },
      hooks: {
        beforeChange: [populateFullName],
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
      admin: {
        description: 'Numer telefonu',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      label: 'Data urodzenia',
      admin: {
        description: 'Data urodzenia',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: UserRole.Member,
      label: 'Rola',
      options: [
        {
          label: 'Członek',
          value: UserRole.Member,
        },
        {
          label: 'Trener',
          value: UserRole.Trainer,
        },
        {
          label: 'Administrator',
          value: UserRole.Admin,
        },
      ],
      admin: {
        description: 'Rola użytkownika w systemie',
      },
    },
    {
      name: 'subscriptionStatus',
      type: 'select',
      defaultValue: SubscriptionStatus.Inactive,
      label: 'Status karnetu',
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
        description: 'Status karnetu (aktualizowany automatycznie)',
        readOnly: true,
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notatki',
      admin: {
        description: 'Notatki o członku',
      },
    },
  ],
}
