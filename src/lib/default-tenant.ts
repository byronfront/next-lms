import prisma from "@/lib/prisma"
import { Plan } from "@generated/prisma/client"

/** Centro compartido cuando alguien se registra y aún no tiene un centro propio. */
export async function ensureDefaultTenant() {
  return prisma.tenant.upsert({
    where: { slug: "default" },
    create: {
      name: "Centro por defecto",
      slug: "default",
      plan: Plan.FREE,
    },
    update: { name: "Centro por defecto" },
  })
}
