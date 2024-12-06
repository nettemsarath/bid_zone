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
import { AuctionItemType } from '@/types/auctionTypes'

interface AuctionItemProps {
  auction: AuctionItemType
}

const AuctionItem = ({ auction }: AuctionItemProps) => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">{auction.auction_name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div>
            <Image
              src="https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU"
              width={400}
              height={400}
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
  userAuctions: AuctionItemType[] | undefined
}

function AuctionItems({ userAuctions }: AuctionItemsProps) {
  return (
    <div className="flex gap-4">
      {userAuctions &&
        userAuctions.map((auction) => (
          <AuctionItem key={auction.auction_name} auction={auction} />
        ))}
    </div>
  )
}

export default AuctionItems
