import type { Session } from "next-auth"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { isSuperAdmin } from "@/lib/permissions"

type SessionUser = NonNullable<Session["user"]>

/**
 * Tenant de la sesión, o el primero de la BD si es SUPER_ADMIN (sin organización en JWT).
 */
export async function getEffectiveTenantIdForUser(
  user: Pick<SessionUser, "tenantId" | "role">
): Promise<string | null> {
  if (user.tenantId) return user.tenantId
  if (isSuperAdmin(user.role)) {
    const tenant = await prisma.tenant.findFirst({
      orderBy: { createdAt: "asc" },
    })
    return tenant?.id ?? null
  }
  return null
}

export async function getTenantId(): Promise<string> {
  const session = await auth()
  if (!session?.user) {
    throw new Error("No session")
  }
  const tenantId = await getEffectiveTenantIdForUser(session.user)
  if (!tenantId) {
    throw new Error("No tenant")
  }
  return tenantId
}
