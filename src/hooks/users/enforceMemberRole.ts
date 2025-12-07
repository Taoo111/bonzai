import type { CollectionBeforeChangeHook } from 'payload'
import type { User } from '@/payload-types'
import { UserRole } from '@/enums/user-role'

/**
 * Hook wymuszający rolę 'member' podczas publicznej rejestracji
 * (gdy użytkownik nie jest zalogowany)
 */
export const enforceMemberRole: CollectionBeforeChangeHook<User> = async ({
  data,
  req,
  operation,
}) => {
  // Tylko podczas tworzenia nowego użytkownika
  if (operation === 'create') {
    // Jeśli użytkownik nie jest zalogowany (publiczna rejestracja)
    if (!req.user) {
      // Wymuś rolę 'member'
      return {
        ...data,
        role: UserRole.Member,
      }
    }
    // Jeśli użytkownik jest zalogowany (admin tworzy użytkownika),
    // pozwól na wybór roli
  }

  return data
}

