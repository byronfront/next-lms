import CreateModuleForm from "./CreateModuleForm"
import LessonsList from "./LessonsList"
import type { Lesson, Module } from "@generated/prisma/client"

export type CourseWithModuleTree = {
  id: string
  modules: (Module & { lessons: Lesson[] })[]
}

export default function ModulesList({ course }: { course: CourseWithModuleTree }) {
  return (
    <div className="space-y-6">

      <CreateModuleForm courseId={course.id} />

      {course.modules.map((module) => (
        <div key={module.id} className="border rounded-md p-4">

          <h2 className="font-semibold mb-2">
            {module.title}
          </h2>

          <LessonsList courseId={course.id} module={module} />

        </div>
      ))}

    </div>
  )
}