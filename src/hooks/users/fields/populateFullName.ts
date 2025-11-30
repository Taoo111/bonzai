import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const populateFullName: FieldHook<User> = async ({ data, siblingData }) => {
  const firstName = siblingData?.firstName || data?.firstName
  const lastName = siblingData?.lastName || data?.lastName

  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }

  return undefined
}
