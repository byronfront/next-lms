import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function RecentActivity({ tenantId }: { tenantId: string }) {
    const enrollments = await prisma.enrollment.findMany({
        where: {
            course: { tenantId },
        },
        include: {
            user: true,
            course: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {enrollments.map((e) => (
                        <div key={e.id} className="text-sm">
                            <strong>{e.user.name}</strong> se inscribió en la ruta{" "}
                            <span className="text-muted-foreground">
                                {e.course.title}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}