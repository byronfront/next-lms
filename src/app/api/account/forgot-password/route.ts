import { NextResponse } from "next/server"
import { randomBytes } from "crypto"
import prisma from "@/lib/prisma"
import { forgotPasswordSchema } from "@/lib/validation"

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const parsed = forgotPasswordSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase().trim()
  const user = await prisma.user.findFirst({
    where: { email },
  })

  // No revelar si el usuario existe
  if (!user?.password) {
    return NextResponse.json({
      ok: true,
      message:
        "Si existe una cuenta con ese email, recibirás instrucciones en breve.",
    })
  }

  const identifier = `reset:${email}`
  await prisma.verificationToken.deleteMany({ where: { identifier } })

  const token = randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 60 * 60 * 1000)

  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  })

  const base = (
    process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  )

  const resetUrl = `${base}/reset-password?email=${encodeURIComponent(email)}&token=${token}`

  if (process.env.NODE_ENV === "development") {
    console.info("[forgot-password] URL de restablecimiento:", resetUrl)
  }

  return NextResponse.json({
    ok: true,
    message:
      "Si existe una cuenta con ese email, recibirás instrucciones en breve.",
    ...(process.env.NODE_ENV === "development" ? { _devResetUrl: resetUrl } : {}),
  })
}
