'use server'

import { isAuthenticatedProcedure } from '@/app/(auth)/__actions/isAuthenticatedProcedure'
import {
  createAuctionUsecase,
  getUserAuctionsUsecase,
} from '@/use_cases/auction'

export const getUserAuctionsAction = isAuthenticatedProcedure
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    try {
      const userAuctions = await getUserAuctionsUsecase(ctx.user.id)
      return userAuctions
    } catch (error) {
      throw error
    }
  })
