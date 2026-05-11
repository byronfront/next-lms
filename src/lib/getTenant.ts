import { auth } from "@/lib/auth"

export async function getTenantId() {
    const session = await auth()

    if (!session?.user?.tenantId) {
        throw new Error("No tenant")
    }

    return session.user.tenantId
}