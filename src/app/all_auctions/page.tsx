'use client'
import React from 'react'
import { useServerActionQuery } from '@/lib/hooks/server-actio-hooks'
import { getAllAuctions } from './__actions__/all_auctions'
import AuctionItems from '@/components/AuctionItems'

function page() {
  const { isLoading, data: allAuctions } = useServerActionQuery(
    getAllAuctions,
    {
      input: undefined,
      queryKey: ['getAllAuctions'],
    },
  )
  console.log('allAuctions:::::', allAuctions)
  return (
    <div className="container py-8 px-8">
      <div>
        <div className="text-2xl font-bold">All Auctions</div>
        <div className="py-6 flex gap-6">
          {allAuctions && <AuctionItems userAuctions={allAuctions} />}
        </div>
      </div>
    </div>
  )
}

export default page
