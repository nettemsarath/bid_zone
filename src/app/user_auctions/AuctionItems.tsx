import AuctionItem from '@/components/AuctionItem'
import { AuctionWithImgUrl } from '@/types/auctionTypes'
import { useRouter } from 'next/router'

interface AuctionItemsProps {
  userAuctions: AuctionWithImgUrl[] | undefined
}

function AuctionItems({ userAuctions }: AuctionItemsProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {userAuctions &&
        userAuctions.map((auction) => (
          <AuctionItem key={auction.id} auction={auction} />
        ))}
    </div>
  )
}

export default AuctionItems
