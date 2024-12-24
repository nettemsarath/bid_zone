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
import { AuctionWithImgUrl } from '@/types/auctionTypes'

interface AuctionItemProps {
  auction: AuctionWithImgUrl
}

const AuctionItem = ({ auction }: AuctionItemProps) => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">{auction.auction_name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="relative flex justify-center items-center w-full h-[200px] overflow-hidden">
            <Image
              src={auction.auction_img_url || '/next.svg'}
              alt="Description of the image"
              layout="fill" // Makes the image fill its parent
              objectFit="cover" // Ensures the image covers the area without stretching
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
  userAuctions: AuctionWithImgUrl[] | undefined
}

function AuctionItems({ userAuctions }: AuctionItemsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {userAuctions &&
        userAuctions.map((auction) => (
          <AuctionItem key={auction.id} auction={auction} />
        ))}
    </div>
  )
}

export default AuctionItems
