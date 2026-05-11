import { PrismaClient, Role, Plan, LessonType } from "../src/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from 'bcryptjs'
import '../envConfig'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // ============================================
  // 1. LIMPIAR BASE DE DATOS (orden importante por FK)
  // ============================================
  await prisma.lessonProgress.deleteMany()
  await prisma.enrollment.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.categoriesOnCourses.deleteMany()
  await prisma.course.deleteMany()
  await prisma.category.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()
  await prisma.tenant.deleteMany()

  // ============================================
  // 2. CREAR CATEGORÍAS
  // ============================================
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Desarrollo Web', slug: 'desarrollo-web' }
    }),
    prisma.category.create({
      data: { name: 'Desarrollo Mobile', slug: 'desarrollo-mobile' }
    }),
    prisma.category.create({
      data: { name: 'Base de Datos', slug: 'base-de-datos' }
    }),
    prisma.category.create({
      data: { name: 'DevOps', slug: 'devops' }
    }),
    prisma.category.create({
      data: { name: 'Inteligencia Artificial', slug: 'inteligencia-artificial' }
    }),
    prisma.category.create({
      data: { name: 'Diseño UX/UI', slug: 'diseno-ux-ui' }
    }),
  ])

  // ============================================
  // 3. CREAR TENANTS
  // ============================================
  const tenantAcme = await prisma.tenant.create({
    data: {
      name: 'ACME Academy',
      slug: 'acme',
      plan: Plan.PRO,
      logo: '/tenants/acme-logo.png',
    }
  })

  const tenantTechSchool = await prisma.tenant.create({
    data: {
      name: 'Tech School',
      slug: 'techschool',
      plan: Plan.STARTER,
      logo: '/tenants/techschool-logo.png',
    }
  })

  const tenantFreeLearn = await prisma.tenant.create({
    data: {
      name: 'Free Learn',
      slug: 'freelearn',
      plan: Plan.FREE,
    }
  })

  // ============================================
  // 4. CREAR USUARIOS
  // ============================================
  const hashedPassword = await hash('password123', 12)

  // Super Admin (sin tenant - administra la plataforma)
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@nextlms.com',
      name: 'Super Administrador',
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      emailVerified: new Date(),
    }
  })

  // Admin de ACME
  const adminAcme = await prisma.user.create({
    data: {
      email: 'admin@acme.com',
      name: 'Admin ACME',
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantAcme.id,
      emailVerified: new Date(),
    }
  })

  // Instructor de ACME
  const instructorAcme = await prisma.user.create({
    data: {
      email: 'instructor@acme.com',
      name: 'Carlos Instructor',
      password: hashedPassword,
      role: Role.INSTRUCTOR,
      tenantId: tenantAcme.id,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    }
  })

  // Estudiantes de ACME
  const student1Acme = await prisma.user.create({
    data: {
      email: 'maria@student.com',
      name: 'María García',
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    }
  })

  const student2Acme = await prisma.user.create({
    data: {
      email: 'juan@student.com',
      name: 'Juan Pérez',
      password: hashedPassword,
      role: Role.STUDENT,
      tenantId: tenantAcme.id,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    }
  })

  // Admin de Tech School
  const adminTechSchool = await prisma.user.create({
    data: {
      email: 'admin@techschool.com',
      name: 'Admin Tech School',
      password: hashedPassword,
      role: Role.ADMIN,
      tenantId: tenantTechSchool.id,
      emailVerified: new Date(),
    }
  })

  // ============================================
  // 5. CREAR CURSOS
  // ============================================
  // Curso 1: Next.js Completo (ACME)
  const courseNextjs = await prisma.course.create({
    data: {
      title: 'Next.js 16 - Curso Completo',
      slug: 'nextjs-16-curso-completo',
      description: `
        Aprende Next.js 16 desde cero hasta nivel avanzado.

        En este curso aprenderás:
        - App Router y Server Components
        - Data Fetching y Caching
        - Autenticación con NextAuth.js
        - Deployment en Vercel

        ¡Incluye proyecto final de un LMS completo!
      `.trim(),
      thumbnail: '/courses/nextjs-thumbnail.jpg',
      price: 49.99,
      isPublished: true,
      isFree: false,
      tenantId: tenantAcme.id,
      ownerId: instructorAcme.id,
      categories: {
        create: [
          { categoryId: categories[0].id }, // Desarrollo Web
        ]
      },
      modules: {
        create: [
          {
            title: 'Introducción a Next.js',
            position: 1,
            lessons: {
              create: [
                {
                  title: '¿Qué es Next.js?',
                  content: `
# ¿Qué es Next.js?

Next.js es un framework de React que permite crear aplicaciones web fullstack.

## Características principales:

1. **Server Components** - Componentes que se renderizan en el servidor
2. **App Router** - Sistema de rutas basado en el sistema de archivos
3. **API Routes** - Backend integrado
4. **Optimizaciones** - Imágenes, fonts, scripts automáticamente optimizados

## ¿Por qué usar Next.js?

- Mejor SEO
- Mejor rendimiento
- Experiencia de desarrollo superior
                  `.trim(),
                  position: 1,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
                {
                  title: 'Instalación y Configuración',
                  content: `
# Instalación de Next.js

## Requisitos previos

- Node.js 18.17 o superior
- npm, yarn, o pnpm

## Crear un nuevo proyecto

\`\`\`bash
npx create-next-app@latest mi-proyecto
\`\`\`

## Opciones recomendadas

- TypeScript: Sí
- ESLint: Sí
- Tailwind CSS: Sí
- src/ directory: Sí
- App Router: Sí
                  `.trim(),
                  position: 2,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
                {
                  title: 'Estructura del Proyecto',
                  content: 'Contenido sobre la estructura de carpetas...',
                  position: 3,
                  type: LessonType.TEXT,
                  isFree: false,
                  isPublished: true,
                },
              ]
            }
          },
          {
            title: 'App Router en Profundidad',
            position: 2,
            lessons: {
              create: [
                {
                  title: 'Rutas y Layouts',
                  content: 'Contenido sobre rutas y layouts...',
                  position: 1,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: 'Loading y Error States',
                  content: 'Contenido sobre estados de carga y error...',
                  position: 2,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: 'Quiz: App Router',
                  content: '{"questions": []}',
                  position: 3,
                  type: LessonType.QUIZ,
                  isPublished: false,
                },
              ]
            }
          },
          {
            title: 'Server Components',
            position: 3,
            lessons: {
              create: [
                {
                  title: 'Server vs Client Components',
                  content: 'Contenido sobre componentes...',
                  position: 1,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: 'Data Fetching en Server Components',
                  content: 'Contenido sobre data fetching en server components...',
                  videoUrl: 'https://www.youtube.com/watch?v=example',
                  position: 2,
                  type: LessonType.VIDEO,
                  isPublished: true,
                },
              ]
            }
          },
        ]
      }
    }
  })

  // Curso 2: React Fundamentos (ACME - Gratis)
  const courseReact = await prisma.course.create({
    data: {
      title: 'React - Fundamentos',
      slug: 'react-fundamentos',
      description: 'Aprende los fundamentos de React antes de pasar a Next.js',
      thumbnail: '/courses/react-thumbnail.jpg',
      isPublished: true,
      isFree: true,
      tenantId: tenantAcme.id,
      ownerId: instructorAcme.id,
      categories: {
        create: [
          { categoryId: categories[0].id }, // Desarrollo Web
        ]
      },
      modules: {
        create: [
          {
            title: 'Introducción a React',
            position: 1,
            lessons: {
              create: [
                {
                  title: '¿Qué es React?',
                  content: 'Introducción a React...',
                  position: 1,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
                {
                  title: 'JSX y Componentes',
                  content: 'JSX y componentes funcionales...',
                  position: 2,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
              ]
            }
          },
        ]
      }
    }
  })

  // Curso: IA para desarrollo frontend (ACME — gratuito y publicado)
  const courseFrontendAi = await prisma.course.create({
    data: {
      title: "IA para desarrollo frontend",
      slug: "ia-para-desarrollo-frontend",
      description: `
Ruta práctica para usar inteligencia artificial en tu día a día como desarrollador frontend: herramientas, prompts útiles, flujo en el editor y límites claros.

Aprenderás a integrar IA sin perder calidad ni seguridad en proyectos React, Next.js y CSS moderno.
      `.trim(),
      thumbnail: "/courses/ia-frontend-thumbnail.jpg",
      isPublished: true,
      isFree: true,
      tenantId: tenantAcme.id,
      ownerId: instructorAcme.id,
      categories: {
        create: [
          { categoryId: categories[4].id },
          { categoryId: categories[5].id },
        ],
      },
      modules: {
        create: [
          {
            title: "1 · Fundamentos y mentalidad",
            position: 1,
            lessons: {
              create: [
                {
                  title: "Qué aporta la IA en frontend (y qué no)",
                  content: `
# IA en frontend: expectativas realistas

## Dónde sí ayuda
- **Borrador rápido** de componentes, hooks y estilos repetitivos.
- **Explicación** de APIs del navegador, patrones de React o errores de TypeScript.
- **Traducción** entre stack (p. ej. de un snippet jQuery a React).
- **Tests** iniciales y casos borde que se te olvidan.

## Dónde debes mandar tú
- **Arquitectura** de carpetas, estado global y límites entre capas.
- **Accesibilidad** real (teclado, lectores de pantalla, contraste).
- **Seguridad**: nunca pegues secretos en el chat; revisa XSS y datos sensibles.
- **Rendimiento**: listas grandes, hidratación y bundle size.

**Regla de oro:** la IA acelera; tú sigues siendo responsable del código que mergeas.
                  `.trim(),
                  position: 1,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
                {
                  title: "Herramientas típicas en el flujo frontend",
                  content: `
# Herramientas que verás en equipos frontend

| Ámbito | Ejemplos |
|--------|----------|
| Editor asistido | Cursor, GitHub Copilot, Codeium |
| Chat general | ChatGPT, Claude, Gemini |
| UI desde texto | v0, componentes de shadcn/ui asistidos |
| Diseño | Figma con plugins de IA (varían) |

## Cómo elegir
- Si ya usas **VS Code / fork**, un **copilot en el IDE** reduce context switching.
- Para **diseño a código**, prueba flujos “descripción → componente” y **refina a mano** después.

## Buenas prácticas
- Mantén **instrucciones del proyecto** (AGENTS.md, convenciones) para que la IA respete tu stack.
- **Pega solo el contexto necesario** (archivo, diff, error), no repos enteros con secretos.
                  `.trim(),
                  position: 2,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
                {
                  title: "Quiz · Conceptos básicos",
                  content: null,
                  position: 3,
                  type: LessonType.QUIZ,
                  isFree: true,
                  isPublished: true,
                  quizData: [
                    {
                      prompt:
                        "¿Cuál es una responsabilidad que NO deberías delegar por completo a la IA?",
                      options: [
                        "Elegir nombres de variables",
                        "Revisar accesibilidad y seguridad antes de mergear",
                        "Generar un botón con Tailwind",
                      ],
                      correctIndex: 1,
                    },
                    {
                      prompt:
                        "¿Qué riesgo hay al pegar API keys o tokens en un chat de IA?",
                      options: [
                        "Ninguno si el chat es de pago",
                        "Pueden filtrarse o quedar en logs; nunca pegues secretos",
                        "Solo afecta al backend",
                      ],
                      correctIndex: 1,
                    },
                  ],
                },
              ],
            },
          },
          {
            title: "2 · Prompting para componentes y estilos",
            position: 2,
            lessons: {
              create: [
                {
                  title: "Plantillas de prompt para UI en React",
                  content: `
# Prompts que funcionan mejor

Incluye siempre **stack**, **estilo** y **restricciones**.

## Ejemplo: componente presentacional
\`\`\`text
Stack: React 19 + TypeScript + Tailwind v4.
Crea un Card con título, descripción y slot para acción.
Requisitos: sin librerías extra, props tipadas, clases utility-only.
Incluye estados hover/focus visibles para accesibilidad básica.
\`\`\`

## Ejemplo: refactor
\`\`\`text
Tengo este componente (pegar código). Extrae la lista a un subcomponente
memoizado y tipa los items. No cambies el comportamiento.
\`\`\`

## Ejemplo: CSS / responsive
\`\`\`text
Necesito una grilla: 1 columna en móvil, 2 en md, 3 en lg. Gap consistente.
Solo Tailwind, sin CSS arbitrario.
\`\`\`

Itera: si el primer resultado no encaja, **acota** (más reglas, menos libertad).
                  `.trim(),
                  position: 1,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: "Accesibilidad y calidad: qué pedir explícitamente",
                  content: `
# Lleva a11y al prompt

Pide de forma explícita:
- **Roles y etiquetas** (\`button\` vs \`div onClick\`).
- **\`aria-*\`** cuando haya colapsables, modales o toggles.
- **Teclado**: orden de tab, Escape para cerrar.
- **Contraste** aproximado si defines paleta.

## Calidad de código
- **TypeScript estricto**: sin \`any\` innecesario.
- **Nombres** alineados al dominio (no \`data1\`, \`handleClick2\`).
- **Efectos**: justifica \`useEffect\`; a veces basta con event handlers o Server Components.

La IA suele omitir a11y si no se la pides; **una línea en el prompt** ahorra retrabajo.
                  `.trim(),
                  position: 2,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: "Quiz · Prompts y UI",
                  content: null,
                  position: 3,
                  type: LessonType.QUIZ,
                  isPublished: true,
                  quizData: [
                    {
                      prompt:
                        "¿Qué suele faltar si solo pides 'haz un modal bonito' sin más contexto?",
                      options: [
                        "Nada, la IA siempre cumple WCAG",
                        "Gestión de foco, aria-modal, cierre con Escape y rol dialog",
                        "Solo los colores",
                      ],
                      correctIndex: 1,
                    },
                  ],
                },
              ],
            },
          },
          {
            title: "3 · Flujo en el editor y revisión",
            position: 3,
            lessons: {
              create: [
                {
                  title: "Iterar con diff y pruebas rápidas",
                  content: `
# Flujo recomendado

1. **Genera** una primera versión pequeña (un archivo o componente).
2. **Lee el diff** como si fuera de otro dev: nombres, efectos secundarios, dependencias.
3. **Ejecuta** el proyecto: consola, linter, types.
4. **Pide ajustes** concretos: "extrae X", "usa \`useCallback\` solo si…".

## Frontend rápido
- **Storybook** o **rutas de demo** ayudan a validar estados sin backend.
- **React DevTools** para props y renders innecesarios.

Evita aceptar bloques enormes sin revisar: **divide** la tarea.
                  `.trim(),
                  position: 1,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: "Límites legales, datos y dependencias",
                  content: `
# Cuidado con licencias y datos

- **Código generado**: revisa licencias de modelos y políticas de tu empresa.
- **No subas** datos personales de usuarios reales a chats externos.
- **Dependencias**: si la IA sugiere un paquete, mira mantenimiento, tamaño y CVEs.

## Arquitectura
La IA puede proponer "la solución rápida" en el componente equivocado. Mantén:
- **Capa de UI** separada de **datos** y **reglas de negocio** cuando crezca el proyecto.

Documenta en el repo **cuándo** se permite usar IA y **cómo** revisar PRs generados.
                  `.trim(),
                  position: 2,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
              ],
            },
          },
          {
            title: "4 · Cierre y checklist",
            position: 4,
            lessons: {
              create: [
                {
                  title: "Checklist: de idea a componente mergeable",
                  content: `
# Antes de abrir el PR

- [ ] ¿El prompt incluyó stack, a11y y restricciones?
- [ ] ¿Pasaron **lint** y **typecheck**?
- [ ] ¿Probaste **teclado** y vista móvil básica?
- [ ] ¿Hay **tests** o al menos una ruta manual documentada?
- [ ] ¿Ningún secreto en historial de chat ni en código?

## Siguientes pasos
- Profundiza en **testing** (Testing Library) pidiendo a la IA casos borde.
- Explora **design systems** y cómo alinear tokens con lo que genera el modelo.

¡Usa la IA como **pair programmer**, no como sustituto del criterio técnico.
                  `.trim(),
                  position: 1,
                  type: LessonType.TEXT,
                  isPublished: true,
                },
                {
                  title: "Quiz final · Buenas prácticas",
                  content: null,
                  position: 2,
                  type: LessonType.QUIZ,
                  isPublished: true,
                  quizData: [
                    {
                      prompt:
                        "¿Cuál es un buen hábito al trabajar con código generado por IA?",
                      options: [
                        "Mergear sin leer si compila",
                        "Revisar diff, ejecutar linter/tests y acotar prompts",
                        "Desactivar TypeScript para ir más rápido",
                      ],
                      correctIndex: 1,
                    },
                    {
                      prompt:
                        "En un equipo, ¿qué documento ayuda a que todos usen la IA de forma coherente?",
                      options: [
                        "Solo el README del diseño",
                        "Guías de uso de IA, convenciones y revisión de PR",
                        "Ninguno, cada quien a su manera",
                      ],
                      correctIndex: 1,
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  })

  // Curso 3: PostgreSQL (Tech School)
  const coursePostgres = await prisma.course.create({
    data: {
      title: 'PostgreSQL desde Cero',
      slug: 'postgresql-desde-cero',
      description: 'Domina PostgreSQL para aplicaciones modernas',
      thumbnail: '/courses/postgres-thumbnail.jpg',
      price: 29.99,
      isPublished: true,
      isFree: false,
      tenantId: tenantTechSchool.id,
      ownerId: adminTechSchool.id,
      categories: {
        create: [
          { categoryId: categories[2].id }, // Base de Datos
        ]
      },
      modules: {
        create: [
          {
            title: 'Fundamentos SQL',
            position: 1,
            lessons: {
              create: [
                {
                  title: 'SELECT, INSERT, UPDATE, DELETE',
                  content: 'Operaciones CRUD básicas...',
                  position: 1,
                  type: LessonType.TEXT,
                  isFree: true,
                  isPublished: true,
                },
              ]
            }
          },
        ]
      }
    }
  })

  // ============================================
  // 6. CREAR INSCRIPCIONES Y PROGRESO
  // ============================================
  // María inscrita en Next.js
  const enrollmentMaria = await prisma.enrollment.create({
    data: {
      userId: student1Acme.id,
      courseId: courseNextjs.id,
    }
  })

  // Juan inscrito en React
  const enrollmentJuan = await prisma.enrollment.create({
    data: {
      userId: student2Acme.id,
      courseId: courseReact.id,
    }
  })

  // María también inscrita en IA para desarrollo frontend
  const enrollmentMariaAiFrontend = await prisma.enrollment.create({
    data: {
      userId: student1Acme.id,
      courseId: courseFrontendAi.id,
    }
  })

  // Obtener lecciones para crear progreso
  const lessonsNextjs = await prisma.lesson.findMany({
    where: { module: { courseId: courseNextjs.id } },
    orderBy: { position: 'asc' },
    take: 2,
  })

  // María ha completado 2 lecciones del curso Next.js
  for (const lesson of lessonsNextjs) {
    await prisma.lessonProgress.create({
      data: {
        enrollmentId: enrollmentMaria.id,
        lessonId: lesson.id,
        isCompleted: true,
        completedAt: new Date(),
      }
    })
  }

  // María completó la primera lección del curso de IA frontend
  const firstLessonAiFrontend = await prisma.lesson.findFirst({
    where: { module: { courseId: courseFrontendAi.id } },
    orderBy: { position: "asc" },
  })
  if (firstLessonAiFrontend) {
    await prisma.lessonProgress.create({
      data: {
        enrollmentId: enrollmentMariaAiFrontend.id,
        lessonId: firstLessonAiFrontend.id,
        isCompleted: true,
        completedAt: new Date(),
      },
    })
  }

}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })