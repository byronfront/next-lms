import CourseForm from "../components/CourseForm"

export default function NewCoursePage() {
  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-3xl font-bold">Nueva ruta</h1>
        <p className="text-muted-foreground">
          Define título, descripción y visibilidad de tu módulo sobre IA para desarrollo
        </p>
      </div>

      <CourseForm />

    </div>
  )
}