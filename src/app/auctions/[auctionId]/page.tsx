import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default async function Page({
  params,
}: {
  params: Promise<{ auctionId: string }>
}) {
  const auctionId = (await params).auctionId
  const autionItem = ''
  return (
    <div>
      <div className="container px-8 py-8">
        <div className="flex flex-1">
          <div>
            <div className="relative overflow-hidden rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <Image
                alt="Aution Image"
                src="https://debkngddbucqramqpexr.supabase.co/storage/v1/s3/bid_zone/1735234144996_016%20copy.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=1e65b34996390647fb5b62ba1ae659a6%2F20241228%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20241228T100643Z&X-Amz-Expires=1800&X-Amz-Signature=614d5cdbbd000c60146c286e940908ef49e2824ef42ada6cf7ea1f3516d56845&X-Amz-SignedHeaders=host&x-id=GetObject"
                width={300}
                height={150}
              />
            </div>
            <div>
              <p>starting Price: $300</p>
              <p>Current Bid: $500</p>
              <p>Bid Interval: $10</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>Current Bids</div>
            <div>
              <Button>Place Bid</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
