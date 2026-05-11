import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  })

  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    const signIn = new URL("/signin", request.url)
    signIn.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(signIn)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
