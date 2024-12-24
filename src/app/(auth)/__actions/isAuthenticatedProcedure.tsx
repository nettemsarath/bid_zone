import { headers } from 'next/headers'
import { createServerActionProcedure } from 'zsa'

export const isAuthenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const headersList = await headers()
      const userId = headersList.get('x-user-id') as string
      const username = headersList.get('x-user-username') as string
      const userRole = headersList.get('x-user-role')

      // Now you can use userId and userRole in your context
      const ctx = {
        user: {
          id: userId,
          username,
          role: userRole,
        },
      }
      return ctx
    } catch (error: any) {
      console.error('Error in authedProcedure:', error)
      throw new Error(error?.message || 'Unknown error in authedProcedure')
    }
  },
)
