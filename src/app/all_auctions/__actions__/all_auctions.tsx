'use server'

import { isAuthenticatedProcedure } from '@/app/(auth)/__actions/isAuthenticatedProcedure'
import { getAllAuctionsExceptUser } from '@/use_cases/auction'

export const getAllAuctions = isAuthenticatedProcedure
  .createServerAction()
  .handler(async ({ ctx, input }) => {
    try {
      const allAuctions = await getAllAuctionsExceptUser(ctx.user.id)
      return allAuctions
    } catch (error) {
      throw error
    }
  })
