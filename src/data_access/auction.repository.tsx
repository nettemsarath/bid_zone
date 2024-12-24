import prisma from '@/lib/prisma'
import { AuctionItemType } from '@/types/auctionTypes'
import { Auction } from '@prisma/client'

export class AuctionRepository {
  async createAuction(data: AuctionItemType): Promise<Auction> {
    return await prisma.auction.create({
      data: {
        auction_name: data.auction_name,
        starting_price: data.starting_price,
        bid_interval: data.bid_interval,
        userId: data.userId,
        auction_img: data.auction_img,
        expires_at: data.expires_at,
      },
    })
  }
  async userAuctions(userId: string) {
    return await prisma.auction.findMany({
      where: {
        userId: userId,
      },
    })
  }
  async allAuctions() {
    return await prisma.auction.findMany({})
  }
  async allAuctionsExceptUser(userId: string): Promise<Auction[]> {
    return await prisma.auction.findMany({
      // where: {
      //   NOT: {
      //     userId: userId,
      //   },
      // },
    })
  }
}
