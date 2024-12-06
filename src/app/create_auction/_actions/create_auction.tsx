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
    console.log('input isss', input)

    await createAuctionUsecase({
      auction_name: input.item_name,
      starting_price: input.starting_price,
      auction_img: '',
      bid_interval: 100,
      expires_at: input.expiry_time,
      userId: 'cm4d88ba400001co0wzlkmba0',
    })
    return {
      message: 'Auction is Created !!!',
    }
  })
