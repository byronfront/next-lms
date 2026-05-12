export const brand = {
  name: "Next LMS",
  /** Texto pequeño bajo el logo en el panel */
  focus: "Cursos para tu equipo y tus estudiantes",
  /** Título que ves en la pestaña del navegador */
  titleSuffix: "Aprende en línea",
  tagline:
    "Monta tus cursos, divide el contenido en partes fáciles de seguir y mira cómo avanza cada persona.",
  description:
    "Pensado para academias, empresas o equipos que enseñan algo: cada centro con su espacio, y claro quién da clase y quién la recibe.",
  hero:
    "Reúne tus materiales en un solo sitio: tú preparas el curso y quien estudia ve todo ordenado y sencillo.",
  /** Enlace del menú para quien va a estudiar */
  navCatalog: "Ver cursos",
} as const

export const brandMetadataTitle = `${brand.name} · ${brand.titleSuffix}`
