'use client'

import React from 'react'
import { useServerActionQuery } from '@/lib/hooks/server-actio-hooks'
import { getUserAuctionsAction } from './_actions/user_auction'
import AuctionItems from './components/AuctionItems'

function page() {
  const {
    isLoading,
    data: userAuctions,
    error,
  } = useServerActionQuery(getUserAuctionsAction, {
    input: { userId: 'cm4d88ba400001co0wzlkmba0' },
    queryKey: ['getUserAuctions'],
  })
  console.log('my auctions', userAuctions)
  return (
    <div className="container py-4 px-4">
      <div>
        <div className="text-2xl font-bold">My Auctions</div>
        <div className="py-6 flex gap-6">
          {userAuctions && <AuctionItems userAuctions={userAuctions} />}
        </div>
      </div>
    </div>
  )
}

export default page
