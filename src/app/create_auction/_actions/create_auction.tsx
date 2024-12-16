'use server'

import { PostAuctionSchema } from '@/types/auctionTypes'
import { createAuctionUsecase } from '@/use_cases/auction'
import { headers } from 'next/headers'
import z from 'zod'
import { createServerActionProcedure } from 'zsa'

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const headersList = await headers()
    const userId = headersList.get('x-user-id')
    const userRole = headersList.get('x-user-role')

    // Now you can use userId and userRole in your context
    const ctx = {
      user: {
        id: userId,
        role: userRole,
      },
    }
    return ctx
  } catch (error: any) {
    console.error('Error in authedProcedure:', error)
    throw new Error(error?.message || 'Unknown error in authedProcedure')
  }
})

export const createAuctionAction = authedProcedure
  .createServerAction()
  .input(PostAuctionSchema)
  .output(z.object({ message: z.string() }))
  .handler(async ({ input, ctx }) => {
    console.log('input isss', input)
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
