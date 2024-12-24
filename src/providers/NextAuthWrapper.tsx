import { SessionProvider, useSession } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
  session: any
}

const NextAuthWrapper = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default NextAuthWrapper
