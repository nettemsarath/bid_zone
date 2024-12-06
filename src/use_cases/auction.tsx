import { AuctionRepository } from '@/data_access/auction.repository'
import { AuctionItemType } from '@/types/auctionTypes'
import { Auctions } from '@prisma/client'

const auctionRepository = new AuctionRepository()

export const createAuctionUsecase = async (
  data: AuctionItemType,
): Promise<Auctions> => {
  // upload file to storage and get filename and file location
  // save auction data in auctions table
  const auctiondata = await auctionRepository.createAuction(data)
  return auctiondata
}

export const getUserAuctionsUsecase = async (
  userId: string,
): Promise<Auctions[]> => {
  const userAuctions = await auctionRepository.userAuctions(userId)
  return userAuctions
}

export const getAllAuctionsExceptUser = () => {}
