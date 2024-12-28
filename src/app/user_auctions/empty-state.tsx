import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Empty_state() {
  return (
    <div className="mx-auto space-y-8 flex flex-col items-center">
      <div>
        <Image src="/package.svg" width={300} height={300} alt="no auctions" />
      </div>
      <h2 className="text-2xl font-bold"> You have no Auctions yet </h2>
      <Button asChild className="px-4 py-6 text-base">
        <Link href={'/create_auction'}>Place Auction</Link>
      </Button>
    </div>
  )
}

export default Empty_state
