'use server'

import { PostAuctionSchema } from '@/types/auctionTypes'
import { createAuctionUsecase } from '@/use_cases/auction'
import z from 'zod'
import { createServerAction } from 'zsa'

export const createAuctionAction = createServerAction()
  .input(PostAuctionSchema)
  .output(z.object({ message: z.string() }))
  .handler(async ({ input }) => {
    // your action logic here
    // console.log('input isss', input)
    await createAuctionUsecase({
      auction_name: input.auction_name,
      starting_price: input.starting_price,
      auction_img: input.auction_img,
      expiry_time: input.expiry_time,
    })
    return {
      message: 'Auction is Created !!!',
    }
  })
