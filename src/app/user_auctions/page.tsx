'use client'

import React from 'react'
import { useServerActionQuery } from '@/lib/hooks/server-actio-hooks'
import { getUserAuctionsAction } from './_actions/user_auction'
import AuctionItems from './AuctionItems'
import Empty_state from './empty-state'

function page() {
  const { isLoading, data: userAuctions } = useServerActionQuery(
    getUserAuctionsAction,
    {
      input: undefined,
      queryKey: ['getUserAuctions'],
    },
  )
  const hasAuctions = userAuctions && userAuctions.length
  return (
    <div className="container mx-auto py-12 px-8 space-y-8">
      <div className="text-4xl font-bold">Your Current Auctions</div>
      <div className="py-6 flex gap-6">
        {hasAuctions ? (
          <AuctionItems userAuctions={userAuctions} />
        ) : (
          <Empty_state />
        )}
      </div>
    </div>
  )
}

export default page
