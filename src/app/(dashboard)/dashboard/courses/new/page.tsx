import CourseForm from "../components/CourseForm"

export default function NewCoursePage() {
  return (
    <div className="space-y-6 max-w-2xl">

      <div>
        <h1 className="text-3xl font-bold">Nuevo curso</h1>
        <p className="text-muted-foreground">
          Define el nombre, un poco de texto que explique el curso y si quieres que sea gratis o que salga en la lista para quien estudia.
        </p>
      </div>

      <CourseForm />

    </div>
  )
}