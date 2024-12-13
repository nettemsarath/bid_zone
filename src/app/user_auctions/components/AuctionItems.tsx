import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserAuctionWithImgUrl } from '@/types/auctionTypes'

interface AuctionItemProps {
  auction: UserAuctionWithImgUrl
}

const AuctionItem = ({ auction }: AuctionItemProps) => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">{auction.auction_name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="justify-items-center">
            <Image
              src={auction.auction_img_url || '/next.svg'}
              width={200}
              height={200}
              objectFit="cover"
              alt="auction_item"
            />
          </div>
          <div className="flex space-x-4 justify-center">
            <div>Starting Price:</div>
            <div className="font-bold"> {`$${auction.starting_price}`} </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AuctionItemsProps {
  userAuctions: UserAuctionWithImgUrl[] | undefined
}

function AuctionItems({ userAuctions }: AuctionItemsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {userAuctions &&
        userAuctions.map((auction) => (
          <AuctionItem key={auction.auction_name} auction={auction} />
        ))}
    </div>
  )
}

export default AuctionItems
