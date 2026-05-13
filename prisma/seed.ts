import "../envConfig"
import { seedIaParaDesarrolloFrontendCourse } from "./setupIaFrontendCourse"
import bcrypt from "bcryptjs"
import { PrismaPg } from "@prisma/adapter-pg"
import { Plan, PrismaClient, Role } from "../generated/prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

/** Contraseña en texto plano que usabas en el seed original (12 rounds bcrypt). */
const SEED_PLAIN_PASSWORD = process.env.SEED_PLAIN_PASSWORD ?? "password123"

async function main() {
  const hashedPassword = await bcrypt.hash(SEED_PLAIN_PASSWORD, 12)
  const verified = new Date()

  const tenantAcme = await prisma.tenant.upsert({
    where: { slug: "acme" },
    update: { name: "ACME", plan: Plan.FREE, isActive: true },
    create: {
      name: "ACME",
      slug: "acme",
      plan: Plan.FREE,
    },
  })

  const tenantTechSchool = await prisma.tenant.upsert({
    where: { slug: "tech-school" },
    update: { name: "Tech School", plan: Plan.FREE, isActive: true },
    create: {
      name: "Tech School",
      slug: "tech-school",
      plan: Plan.FREE,
    },
  })

  await prisma.user.upsert({
    where: { email: "superadmin@nextlms.com" },
    update: {
      name: "Super Administrador",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      tenantId: null,
      emailVerified: verified,
      isActive: true,
    },
    create: {
      email: "superadmin@nextlms.com",
      name: "Super Administrador",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      emailVerified: verified,
    },
  })

  await prisma.user.upsert({
    where: { email: "admin@acme.com" },
    update: {
      name: "Admin ACME",
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      isActive: true,
    },
    create: {
      email: "admin@acme.com",
      name: "Admin ACME",
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantAcme.id,
      emailVerified: verified,
    },
  })

  const instructorAcme = await prisma.user.upsert({
    where: { email: "instructor@acme.com" },
    update: {
      name: "Carlos Instructor",
      password: hashedPassword,
      role: Role.INSTRUCTOR,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      isActive: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    },
    create: {
      email: "instructor@acme.com",
      name: "Carlos Instructor",
      password: hashedPassword,
      role: Role.INSTRUCTOR,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    },
  })

  const student1Acme = await prisma.user.upsert({
    where: { email: "maria@student.com" },
    update: {
      name: "María García",
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      isActive: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    },
    create: {
      email: "maria@student.com",
      name: "María García",
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    },
  })

  const student2Acme = await prisma.user.upsert({
    where: { email: "juan@student.com" },
    update: {
      name: "Juan Pérez",
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      isActive: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    },
    create: {
      email: "juan@student.com",
      name: "Juan Pérez",
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: verified,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
    },
  })

  await prisma.user.upsert({
    where: { email: "admin@techschool.com" },
    update: {
      name: "Admin Tech School",
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantTechSchool.id,
      emailVerified: verified,
      isActive: true,
    },
    create: {
      email: "admin@techschool.com",
      name: "Admin Tech School",
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantTechSchool.id,
      emailVerified: verified,
    },
  })

  const categoryIa = await prisma.category.upsert({
    where: { slug: "inteligencia-artificial" },
    update: { name: "Inteligencia Artificial" },
    create: {
      name: "Inteligencia Artificial",
      slug: "inteligencia-artificial",
    },
  })

  const categoryUx = await prisma.category.upsert({
    where: { slug: "diseno-ux-ui" },
    update: { name: "Diseño UX/UI" },
    create: {
      name: "Diseño UX/UI",
      slug: "diseno-ux-ui",
    },
  })

  const course = await seedIaParaDesarrolloFrontendCourse(prisma, {
    tenantId: tenantAcme.id,
    ownerId: instructorAcme.id,
    categoryIaId: categoryIa.id,
    categoryUxId: categoryUx.id,
  })

  for (const uid of [student1Acme.id, student2Acme.id]) {
    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: uid, courseId: course.id } },
      update: {},
      create: {
        userId: uid,
        courseId: course.id,
      },
    })
  }

  console.log("Listo: usuarios ACME/Tech School + curso «IA para desarrollo frontend» (contenido original).")
  console.log(
    [
      `Contraseña (todas): ${SEED_PLAIN_PASSWORD}  (override: SEED_PLAIN_PASSWORD)`,
      "  superadmin@nextlms.com     — SUPER_ADMIN (sin tenant)",
      "  admin@acme.com             — ADMIN (ACME)",
      "  instructor@acme.com        — INSTRUCTOR (ACME)",
      "  maria@student.com          — STUDENT (ACME)",
      "  juan@student.com           — STUDENT (ACME)",
      "  admin@techschool.com       — ADMIN (Tech School)",
    ].join("\n")
  )
}

main()
  .catch((error) => {
    console.error("Error en seed:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
