import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { ensureDefaultTenant } from "@/lib/default-tenant"
import { registerSchema } from "@/lib/validation"

export async function POST(req: Request) {
    try {
        let json: unknown
        try {
            json = await req.json()
        } catch {
            return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
        }

        const parsed = registerSchema.safeParse(json)
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues.map((i) => i.message).join(", ") },
                { status: 400 }
            )
        }

        const { name, email, password } = parsed.data

        const existingUser = await prisma.user.findFirst({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "El usuario ya existe" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const tenant = await ensureDefaultTenant()

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                tenantId: tenant.id,
            },
        })

        return NextResponse.json(
            { message: "Usuario creado correctamente", userId: user.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("[REGISTER_ERROR]", error)

        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}