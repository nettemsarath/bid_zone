'use client'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const session = useSession()
  console.log('session isss:::::::::::::::', session)
  return (
    <div className="container">
      <div className="px-8 py-8">Home...</div>
    </div>
  )
}
