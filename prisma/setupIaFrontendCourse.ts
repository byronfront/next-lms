import type { Prisma } from "../generated/prisma/client"
import type { PrismaClient } from "../generated/prisma/client"
import { LessonType } from "../generated/prisma/client"

/** Módulos y lecciones del curso original «IA para desarrollo frontend» (seed histórico). */
export const IA_FRONTEND_MODULES = [
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
]

export async function seedIaParaDesarrolloFrontendCourse(
  prisma: PrismaClient,
  ctx: { tenantId: string; ownerId: string; categoryIaId: string; categoryUxId: string }
) {
  const { tenantId, ownerId, categoryIaId, categoryUxId } = ctx

  const course = await prisma.course.upsert({
    where: { tenantId_slug: { tenantId, slug: "ia-para-desarrollo-frontend" } },
    update: {
      title: "IA para desarrollo frontend",
      description: `Ruta práctica para usar inteligencia artificial en tu día a día como desarrollador frontend: herramientas, prompts útiles, flujo en el editor y límites claros.

Aprenderás a integrar IA sin perder calidad ni seguridad en proyectos React, Next.js y CSS moderno.`,
      thumbnail: "/courses/ia-frontend/ia-fe-course-thumbnail.png",
      isPublished: true,
      isFree: true,
      ownerId,
    },
    create: {
      title: "IA para desarrollo frontend",
      slug: "ia-para-desarrollo-frontend",
      description: `Ruta práctica para usar inteligencia artificial en tu día a día como desarrollador frontend: herramientas, prompts útiles, flujo en el editor y límites claros.

Aprenderás a integrar IA sin perder calidad ni seguridad en proyectos React, Next.js y CSS moderno.`,
      thumbnail: "/courses/ia-frontend/ia-fe-course-thumbnail.png",
      isPublished: true,
      isFree: true,
      tenantId,
      ownerId,
    },
  })

  await prisma.categoriesOnCourses.deleteMany({ where: { courseId: course.id } })
  await prisma.categoriesOnCourses.createMany({
    data: [
      { courseId: course.id, categoryId: categoryIaId },
      { courseId: course.id, categoryId: categoryUxId },
    ],
  })

  await prisma.module.deleteMany({ where: { courseId: course.id } })

  for (const mod of IA_FRONTEND_MODULES) {
    const { title, position, lessons } = mod as {
      title: string
      position: number
      lessons: { create: Prisma.LessonCreateWithoutModuleInput[] }
    }
    await prisma.module.create({
      data: {
        courseId: course.id,
        title,
        position,
        lessons: { create: lessons.create },
      },
    })
  }

  return course
}

