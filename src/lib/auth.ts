import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { ensureDefaultTenant } from "@/lib/default-tenant"

declare module "next-auth" {
  interface User {
    role: string;
    tenantId: string | null;
  }

  interface Session {
    user: {
      id: string;
      tenantId: string | null;
      role: string;
    } & DefaultSession["user"];
  }
}

async function getUserFromDb(email: string, password: string) {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return null

  const user = await prisma.user.findFirst({
    where: {
      email: { equals: normalized, mode: "insensitive" },
    },
  })

  if (!user || !user.password) {
    return null
  }

  const isValidPassword = await compare(password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}

const googleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID?.length) &&
  Boolean(process.env.AUTH_GOOGLE_SECRET?.length)
const githubConfigured =
  Boolean(process.env.AUTH_GITHUB_ID?.length) &&
  Boolean(process.env.AUTH_GITHUB_SECRET?.length)

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
          }),
        ]
      : []),
    ...(githubConfigured
      ? [
          GitHub({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    /** Misma lógica que Auth.js por defecto, más coincidencia con AUTH_URL (Vercel / dominio custom). */
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      try {
        const target = new URL(url)
        const base = new URL(baseUrl)
        if (target.origin === base.origin) {
          return url
        }
        const authBase = process.env.AUTH_URL
        if (authBase) {
          const configured = new URL(authBase)
          if (target.origin === configured.origin) {
            return url
          }
        }
      } catch {
        /* url inválida */
      }
      return baseUrl
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.tenantId = (user as { tenantId: string | null }).tenantId
        token.role = user.role
      }

      const userId =
        (typeof token.id === "string" && token.id) ||
        (typeof token.sub === "string" && token.sub) ||
        undefined

      if (userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { tenantId: true, role: true },
        })

        if (dbUser) {
          token.role = dbUser.role
          if (dbUser.role === "SUPER_ADMIN") {
            token.tenantId = dbUser.tenantId
          } else if (!dbUser.tenantId) {
            const tenant = await ensureDefaultTenant()
            await prisma.user.update({
              where: { id: userId },
              data: { tenantId: tenant.id },
            })
            token.tenantId = tenant.id
          } else {
            token.tenantId = dbUser.tenantId
          }
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || (token.sub as string)
        session.user.tenantId = (token.tenantId as string | null | undefined) ?? null
        session.user.role = token.role as string
      }

      return session
    },
  },
})