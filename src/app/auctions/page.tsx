'use client'
import React from 'react'
import { useServerActionQuery } from '@/lib/hooks/server-actio-hooks'
import { getAllAuctions } from './__actions__/all_auctions'
import AuctionItems from './AuctionItems'

function page() {
  const { isLoading, data: allAuctions } = useServerActionQuery(
    getAllAuctions,
    {
      input: undefined,
      queryKey: ['getAllAuctions'],
    },
  )
  return (
    <div className="container mx-auto py-12 px-8 space-y-4">
      <div className="text-4xl font-bold">All Auctions</div>
      <div className="py-6 flex gap-6">
        {allAuctions && <AuctionItems userAuctions={allAuctions} />}
      </div>
    </div>
  )
}

export default page
