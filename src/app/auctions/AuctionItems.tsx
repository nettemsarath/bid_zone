import { useRouter } from 'next/navigation'
import AuctionItem from '@/components/AuctionItem'
import { AuctionWithImgUrl } from '@/types/auctionTypes'

interface AuctionItemsProps {
  userAuctions: AuctionWithImgUrl[] | undefined
}

function AuctionItems({ userAuctions }: AuctionItemsProps) {
  const router = useRouter()
  const handleNavigate = (auctionId: string | undefined) => {
    router.push(`/auctions/${auctionId}`)
  }
  return (
    <div className="flex flex-wrap gap-6">
      {userAuctions &&
        userAuctions.map((auction) => (
          <AuctionItem
            key={auction.id}
            auction={auction}
            handleNavigate={handleNavigate}
          />
        ))}
    </div>
  )
}

export default AuctionItems
