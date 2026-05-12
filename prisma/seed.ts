import "../envConfig"
import { PrismaPg } from "@prisma/adapter-pg"
import { Plan, PrismaClient, Role } from "../generated/prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "seed-default" },
    update: { name: "Centro demo", plan: Plan.FREE },
    create: {
      name: "Centro demo",
      slug: "seed-default",
      plan: Plan.FREE,
    },
  })

  const instructor = await prisma.user.upsert({
    where: { email: "seed.instructor@nextlms.dev" },
    update: { tenantId: tenant.id, role: Role.INSTRUCTOR, isActive: true, name: "Instructora demo" },
    create: {
      email: "seed.instructor@nextlms.dev",
      name: "Instructora demo",
      role: Role.INSTRUCTOR,
      tenantId: tenant.id,
      isActive: true,
    },
  })

  const student = await prisma.user.upsert({
    where: { email: "seed.student@nextlms.dev" },
    update: { tenantId: tenant.id, role: Role.STUDENT, isActive: true, name: "Estudiante demo" },
    create: {
      email: "seed.student@nextlms.dev",
      name: "Estudiante demo",
      role: Role.STUDENT,
      tenantId: tenant.id,
      isActive: true,
    },
  })

  const category = await prisma.category.upsert({
    where: { slug: "introduccion" },
    update: { name: "Primeros pasos con la app" },
    create: {
      name: "Primeros pasos con la app",
      slug: "introduccion",
    },
  })

  const course = await prisma.course.upsert({
    where: { tenantId_slug: { tenantId: tenant.id, slug: "curso-seed" } },
    update: {
      title: "Bienvenida a Next LMS",
      description:
        "Curso de prueba para conocer la plataforma: partes, clases y apuntarse. Cuando quieras, cámbialo por contenido real.",
      ownerId: instructor.id,
      isPublished: true,
      isFree: true,
    },
    create: {
      title: "Bienvenida a Next LMS",
      slug: "curso-seed",
      description:
        "Curso de prueba para conocer la plataforma: partes, clases y apuntarse. Cuando quieras, cámbialo por contenido real.",
      ownerId: instructor.id,
      tenantId: tenant.id,
      isPublished: true,
      isFree: true,
    },
  })

  await prisma.categoriesOnCourses.upsert({
    where: {
      courseId_categoryId: {
        courseId: course.id,
        categoryId: category.id,
      },
    },
    update: {},
    create: {
      courseId: course.id,
      categoryId: category.id,
    },
  })

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: course.id } },
    update: {},
    create: {
      userId: student.id,
      courseId: course.id,
    },
  })

  console.log("Listo: datos de ejemplo cargados.")
}

main()
  .catch((error) => {
    console.error("Error en seed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })