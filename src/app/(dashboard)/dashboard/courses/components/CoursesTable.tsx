import { getCourses } from "@/lib/data/courses"
import { getTenantId } from "@/lib/getTenant"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CoursesTable() {
    const tenantId = await getTenantId()
    const courses = await getCourses(tenantId)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rutas de aprendizaje</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">

                    {courses.length === 0 && (
                        <p className="text-muted-foreground">
                            Aún no hay rutas. Crea la primera sobre IA y desarrollo.
                        </p>
                    )}

                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex items-center justify-between border rounded-md p-4"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {course.title}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Instructor: {course.owner.name}
                                </p>

                                <Link href={`/dashboard/courses/${course.id}`}>
                                    <Button variant="outline" size="sm">
                                        Ver
                                    </Button>
                                </Link>
                            </div>

                            <div className="text-sm text-muted-foreground text-right">
                                <p>{course._count.modules} módulos</p>
                                <p>{course._count.enrollments} estudiantes</p>
                            </div>
                        </div>
                    ))}

                </div>
            </CardContent>
        </Card>
    )
}