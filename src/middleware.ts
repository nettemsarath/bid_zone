// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  console.log('token isss', token)
  // Check if the user is trying to access an admin page
  // If no token or role is not admin, redirect to home
  const publicRoutes = ['/', '/login']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next() // Allow access to public routes
  }
  if (!token || token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow access if conditions are met
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
