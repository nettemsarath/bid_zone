// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a new headers object
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const publicRoutes = ['/', '/login']
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next() // Allow access to public routes
  }
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const requestHeaders = new Headers(request.headers)

  // Add the user information to the request headers
  if (token) {
    requestHeaders.set('x-user-id', 'user_12345' as string)
    requestHeaders.set('x-user-role', 'role_admin' as string)
    // Add any other relevant user information from the token
  }
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
