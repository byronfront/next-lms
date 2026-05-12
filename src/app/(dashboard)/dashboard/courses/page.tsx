import { Suspense } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import CoursesTable from "./components/CoursesTable"

export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contenido</h1>

            <div className="flex justify-between">
                <p className="text-muted-foreground">
                    Monta tus cursos por partes y elige qué pueden ver quienes estudian.
                </p>
                <Link
                    href="/dashboard/courses/new"
                    className={buttonVariants()}
                    >
                    + Nuevo curso
                </Link>
            </div>

            <Suspense fallback={<div>Cargando cursos…</div>}>
                <CoursesTable />
            </Suspense>

        </div>
    )
}