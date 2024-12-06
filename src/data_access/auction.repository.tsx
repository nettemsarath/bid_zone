import prisma from '@/lib/prisma'
import { AuctionItemType } from '@/types/auctionTypes'
import { Auctions } from '@prisma/client'

export class AuctionRepository {
  async createAuction(data: AuctionItemType): Promise<Auctions> {
    return await prisma.auctions.create({
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
    return await prisma.auctions.findMany({
      where: {
        userId: userId,
      },
    })
  }
}
