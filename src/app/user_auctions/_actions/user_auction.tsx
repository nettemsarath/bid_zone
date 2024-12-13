'use server'

import { UserIdSchema } from '@/types/auctionTypes'
import {
  createAuctionUsecase,
  getUserAuctionsUsecase,
} from '@/use_cases/auction'
import { createServerAction } from 'zsa'

export const getUserAuctionsAction = createServerAction()
  .input(UserIdSchema)
  .handler(async ({ input }) => {
    try {
      const userAuctions = await getUserAuctionsUsecase(input.userId)
      return userAuctions
    } catch (error) {
      throw error
    }
  })
