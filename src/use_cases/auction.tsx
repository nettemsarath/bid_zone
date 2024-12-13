import { AuctionRepository } from '@/data_access/auction.repository'
import {
  PostAuctionSchemaType,
  AuctionItemType,
  UserAuctionWithImgUrl,
} from '@/types/auctionTypes'
import { Auction } from '@prisma/client'
import { getSingedUrl, uploadFileToS3 } from '@/lib/s3'

const auctionRepository = new AuctionRepository()

export const createAuctionUsecase = async (
  data: PostAuctionSchemaType,
): Promise<Auction> => {
  // upload file to storage and get filename and file location
  // save auction data in auctions table
  const file_key = `${Date.now()}_${data.auction_img.name}`
  const uploadedfile = await uploadFileToS3(data.auction_img, file_key)
  const new_auction = {
    auction_name: data.auction_name,
    starting_price: data.starting_price,
    auction_img: file_key,
    bid_interval: 100,
    expires_at: data.expiry_time,
    userId: 'cm4d88ba400001co0wzlkmba0',
  }
  const auctiondata = await auctionRepository.createAuction(new_auction)
  return auctiondata
}

export const getUserAuctionsUsecase = async (
  userId: string,
): Promise<UserAuctionWithImgUrl[]> => {
  const userAuctions = await auctionRepository.userAuctions(userId)
  const userAuctionsWithImages = await Promise.all(
    userAuctions.map(async (auction) => {
      if (auction.auction_img) {
        const auction_img_url = await getSingedUrl(auction.auction_img)
        return {
          ...auction,
          auction_img_url: auction_img_url,
        }
      }
      return {
        ...auction,
        auction_img_url: '',
      }
    }),
  )
  return userAuctionsWithImages
}

export const getAllAuctionsExceptUser = () => {}
