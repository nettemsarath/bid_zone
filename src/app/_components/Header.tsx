'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Header() {
  return (
    <div className="bg-gray-300">
      <div className="container max-w-screen-12xl">
        <div className="px-8 flex items-center justify-between py-4">
          <div className="flex gap-12">
            <div className="font-bold text-2xl">
              <Link href="/">BidZone</Link>
            </div>
            <div className="flex gap-12">
              <div className="text-base cursor-pointer hover:underline">
                <Link href="/auctions">All Auctions</Link>
              </div>
              <div className="text-base cursor-pointer hover:underline">
                <Link href="/create_auction">Create Auction</Link>
              </div>
              <div className="text-base cursor-pointer hover:underline">
                <Link href="/user_auctions">My Auctions</Link>
              </div>
            </div>
          </div>
          <div>
            <Link href="/login">
              <Button className="py-2 px-6 bg-gray-500">SignIn</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
