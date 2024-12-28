'use server'

import z from 'zod'
import { PostAuctionSchema } from '@/types/auctionTypes'
import { createAuctionUsecase } from '@/use_cases/auction'
import { isAuthenticatedProcedure } from '@/app/(auth)/__actions/isAuthenticatedProcedure'

export const createAuctionAction = isAuthenticatedProcedure
  .createServerAction()
  .input(PostAuctionSchema)
  .output(z.object({ message: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      await createAuctionUsecase({
        auction_name: input.auction_name,
        starting_price: input.starting_price,
        auction_img: input.auction_img,
        expiry_time: input.expiry_time,
        userId: ctx.user.id,
      })

      return {
        message: 'Auction is Created !!!',
      }
    } catch (error: any) {
      console.log('error isss', error)
      throw new Error('Failed to create auction: ' + error.message)
    }
  })
