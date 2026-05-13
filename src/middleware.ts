import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

function isSecureCookieContext(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-proto")
  if (forwarded) {
    return forwarded.split(",")[0].trim() === "https"
  }
  return request.nextUrl.protocol === "https:"
}

export async function middleware(request: NextRequest) {
  const secure = isSecureCookieContext(request)
  let token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: secure,
  })
  if (!token) {
    token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: !secure,
    })
  }

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
