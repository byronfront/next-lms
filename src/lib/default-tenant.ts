import prisma from "@/lib/prisma"
import { Plan } from "@/lib/generated/prisma/client"

/** Tenant compartido para registros y cuentas que aún no tienen organización propia. */
export async function ensureDefaultTenant() {
  return prisma.tenant.upsert({
    where: { slug: "default" },
    create: {
      name: "Espacio predeterminado",
      slug: "default",
      plan: Plan.FREE,
    },
    update: {},
  })
}
