import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Header() {
  return (
    <div className=" bg-sky-500">
      <div className="container max-w-screen-4xl">
        <div className="flex items-center justify-between py-4 px-4">
          <div>
            <div className="font-bold text-2xl">
              <Link href="/">BidZone</Link>
            </div>
          </div>
          <div className="text-base cursor-pointer">
            <Link href="/all_auctions">All Auctions</Link>
          </div>
          <div className="text-base cursor-pointer">
            <Link href="/create_auction">Create Auction</Link>
          </div>
          <div className="text-base cursor-pointer">
            <Link href="/my_auctions">My Auctions</Link>
          </div>
          <div>
            <Button className="py-2 px-6 bg-sky-900">SignIn</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
