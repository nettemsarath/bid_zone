import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { getLoginUserUsecase } from '@/use_cases/user'

const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, // 1/2 hours
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // console.log('credentials', credentials)
        // Simulate fetching user from a database
        try {
          const user = await getLoginUserUsecase({
            email: credentials.email as string,
            password: credentials.password as string,
          })
          return user
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.username = user.username
        token.picture = user.image
        token.role = user.role // Correctly add role to token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.username = token.username as string
        session.user.image = token.picture as string
        session.user.role = token.role as string // Fix here: use 'role' instead of 'roll'
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
