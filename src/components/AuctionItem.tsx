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
import { Button } from '@/components/ui/button'

interface AuctionItemProps {
  auction: AuctionWithImgUrl
  handleNavigate?: (auctionId: string | undefined) => void
}

const AuctionItem = ({ auction, handleNavigate }: AuctionItemProps) => {
  return (
    <div>
      <Card className="w-[250px] cursor-pointer">
        <CardHeader>
          <CardTitle className="text-center">{auction.auction_name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <div className="relative flex justify-center items-center w-full h-[150px] overflow-hidden">
            <Image
              src={auction.auction_img_url || '/next.svg'}
              alt="Description of the image"
              layout="fill" // Makes the image fill its parent
              objectFit="contain" // Ensures the image covers the area without stretching
            />
          </div>
          <div className="flex space-x-4 justify-center">
            <div>Starting Price:</div>
            <div className="font-bold"> {`$${auction.starting_price}`} </div>
          </div>
          {handleNavigate && (
            <div className="flex justify-center">
              <Button onClick={() => handleNavigate(auction.id)}>
                Place Bid
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuctionItem
