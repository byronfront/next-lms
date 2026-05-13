/**
 * Texto del encabezado (sin #) tal como sale del markdown del curso
 * «IA para desarrollo frontend» → ruta bajo /public/courses/ia-frontend/
 */
const IA_FRONTEND_SECTION_IMAGES: Record<string, string> = {
  "IA en frontend: expectativas realistas":
    "/courses/ia-frontend/ia-fe-m01-l01-expectativas-hero.png",
  "Dónde sí ayuda": "/courses/ia-frontend/ia-fe-m01-l01-donde-si-ayuda.png",
  "Dónde debes mandar tú":
    "/courses/ia-frontend/ia-fe-m01-l01-donde-debes-mandar-tu.png",
  "Herramientas que verás en equipos frontend":
    "/courses/ia-frontend/ia-fe-m01-l02-herramientas-hero.png",
  "Cómo elegir": "/courses/ia-frontend/ia-fe-m01-l02-como-elegir.png",
  "Buenas prácticas": "/courses/ia-frontend/ia-fe-m01-l02-buenas-practicas.png",
  "Prompts que funcionan mejor":
    "/courses/ia-frontend/ia-fe-m02-l01-prompts-hero.png",
  "Ejemplo: componente presentacional":
    "/courses/ia-frontend/ia-fe-m02-l01-ejemplo-componente.png",
  "Ejemplo: refactor": "/courses/ia-frontend/ia-fe-m02-l01-ejemplo-refactor.png",
  "Ejemplo: CSS / responsive":
    "/courses/ia-frontend/ia-fe-m02-l01-ejemplo-css-responsive.png",
  "Lleva a11y al prompt": "/courses/ia-frontend/ia-fe-m02-l02-a11y-hero.png",
  "Calidad de código": "/courses/ia-frontend/ia-fe-m02-l02-calidad-codigo.png",
  "Flujo recomendado": "/courses/ia-frontend/ia-fe-m03-l01-flujo-hero.png",
  "Frontend rápido": "/courses/ia-frontend/ia-fe-m03-l01-frontend-rapido.png",
  "Cuidado con licencias y datos":
    "/courses/ia-frontend/ia-fe-m03-l02-licencias-hero.png",
  "Arquitectura": "/courses/ia-frontend/ia-fe-m03-l02-arquitectura.png",
  "Antes de abrir el PR":
    "/courses/ia-frontend/ia-fe-m04-l01-antes-del-pr-hero.png",
  "Siguientes pasos": "/courses/ia-frontend/ia-fe-m04-l01-siguientes-pasos.png",
}

export function resolveLessonSectionImage(heading: string): string | undefined {
  const key = heading.trim()
  return IA_FRONTEND_SECTION_IMAGES[key]
}

/** Rutas bajo public/ o absolutas; evita enlaces rotos si falta la barra inicial. */
export function normalizeLessonAssetSrc(src: string | null | undefined): string {
  if (!src) return ""
  const s = src.trim()
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("//")) {
    return s
  }
  if (s.startsWith("/")) return s
  if (s.toLowerCase().startsWith("public/")) {
    return `/${s.slice(7)}`
  }
  return `/${s.replace(/^\.?\//, "")}`
}
