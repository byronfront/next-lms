import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { resetPasswordSchema } from "@/lib/validation"

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const parsed = resetPasswordSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 }
    )
  }

  const { email, token, password } = parsed.data
  const identifier = `reset:${email.toLowerCase().trim()}`

  const record = await prisma.verificationToken.findFirst({
    where: { identifier, token },
  })

  if (!record || record.expires < new Date()) {
    return NextResponse.json(
      { error: "Enlace inválido o expirado" },
      { status: 400 }
    )
  }

  const hashed = await bcrypt.hash(password, 10)
  await prisma.user.updateMany({
    where: { email: email.toLowerCase().trim() },
    data: { password: hashed },
  })

  await prisma.verificationToken.delete({
    where: {
      identifier_token: { identifier, token },
    },
  })

  return NextResponse.json({ ok: true })
}
