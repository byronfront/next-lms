import type { ReactNode } from "react"
import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  normalizeLessonAssetSrc,
  resolveLessonSectionImage,
} from "@/lib/lessonSectionImages"

function plainHeadingText(children: ReactNode): string {
  const out: string[] = []
  const walk = (n: ReactNode) => {
    if (n == null || typeof n === "boolean") return
    if (typeof n === "string" || typeof n === "number") {
      out.push(String(n))
      return
    }
    if (Array.isArray(n)) {
      n.forEach(walk)
      return
    }
    if (
      typeof n === "object" &&
      n !== null &&
      "props" in n &&
      typeof (n as { props?: unknown }).props === "object" &&
      (n as { props?: { children?: ReactNode } }).props != null
    ) {
      walk((n as { props: { children?: ReactNode } }).props.children)
    }
  }
  walk(children)
  return out.join(" ").replace(/\s+/g, " ").trim()
}

function SectionImageSlot({
  heading,
  variant,
}: {
  heading: string
  variant: "intro" | "section"
}) {
  const resolved = resolveLessonSectionImage(heading)
  if (resolved) {
    return (
      <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-md ring-1 ring-border/60">
        {/* eslint-disable-next-line @next/next/no-img-element -- assets estáticos en /public */}
        <img
          src={resolved}
          alt={heading || "Ilustración de la lección"}
          className="max-h-[min(420px,55vh)] w-full object-cover"
          loading="lazy"
        />
      </figure>
    )
  }

  return (
    <figure
      aria-label={
        heading
          ? `Espacio reservado para imagen de la sección: ${heading}`
          : "Espacio reservado para imagen de la lección"
      }
      className={cn(
        "not-prose my-6 overflow-hidden rounded-2xl border border-dashed border-primary/35 bg-gradient-to-br from-primary/[0.08] via-card/90 to-muted/50 shadow-inner ring-1 ring-border/70 dark:from-primary/[0.12] dark:via-card/40 dark:to-muted/25",
        variant === "intro"
          ? "aspect-[2.35/1] min-h-[min(200px,36vw)] max-h-[280px]"
          : "aspect-[21/9] min-h-[min(140px,28vw)] max-h-[220px]"
      )}
    >
      <div className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-2 px-4 py-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <ImageIcon className="h-6 w-6 opacity-90" aria-hidden />
        </div>
        <figcaption className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">
          Imagen de sección
        </figcaption>
        {heading ? (
          <p className="max-w-lg text-xs leading-snug text-muted-foreground">
            <span className="font-medium text-foreground/80">Referencia: </span>
            {heading}
          </p>
        ) : (
          <p className="max-w-md text-xs text-muted-foreground">
            Sustituye este bloque por una ilustración; usa los prompts del archivo
            <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
              docs/prompts-imagenes-lecciones.txt
            </code>
            del repositorio.
          </p>
        )}
      </div>
    </figure>
  )
}

const markdownComponents: Partial<Components> = {
  h1: ({ children }) => (
    <>
      <h1 className="mb-1 mt-1 border-b border-border/70 pb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {children}
      </h1>
      <SectionImageSlot variant="intro" heading={plainHeadingText(children)} />
    </>
  ),
  h2: ({ children }) => (
    <>
      <h2 className="mb-2 mt-12 scroll-mt-24 border-l-[3px] border-primary pl-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {children}
      </h2>
      <SectionImageSlot variant="section" heading={plainHeadingText(children)} />
    </>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-8 text-lg font-semibold text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[0.95rem] leading-relaxed text-foreground/90 md:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2.5 pl-6 marker:text-primary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-foreground/90 [&>p]:my-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      rel="noopener noreferrer"
      target={href?.startsWith("http") ? "_blank" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-primary/45 bg-muted/40 py-1 pl-5 pr-3 text-sm italic text-muted-foreground md:text-[0.95rem]">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /\blanguage-/.test(className ?? "")
    if (isBlock) {
      return (
        <code
          className={cn(className, "block bg-transparent p-0 font-mono text-[13px] leading-relaxed")}
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted/60 p-4 text-sm shadow-sm">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/80 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-muted/30">{children}</tr>,
  th: ({ children }) => (
    <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => <td className="px-4 py-3 text-foreground/90">{children}</td>,
  img: ({ src, alt }) => {
    const url = normalizeLessonAssetSrc(typeof src === "string" ? src : undefined)
    return (
    <span className="not-prose my-6 block">
      {/* eslint-disable-next-line @next/next/no-img-element -- URLs de contenido curado / externos */}
      <img
        src={url}
        alt={alt ?? ""}
        className="max-h-[420px] w-full rounded-xl border border-border object-cover shadow-md"
        loading="lazy"
      />
      {alt ? (
        <span className="mt-2 block text-center text-xs text-muted-foreground">{alt}</span>
      ) : null}
    </span>
    )
  },
}

export function LessonMarkdown({ markdown }: { markdown: string }) {
  return (
    <article className="lesson-markdown rounded-2xl border border-border/90 bg-card/80 p-6 shadow-md ring-1 ring-black/[0.04] backdrop-blur-md md:p-10 dark:bg-card/45 dark:ring-white/[0.06]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  )
}
