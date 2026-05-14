import Link from "next/link"
import { brand } from "@/lib/brand"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/50 backdrop-blur-md rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">

        <div>
          <h3 className="font-semibold text-base">{brand.name}</h3>
          <p className="text-muted-foreground mt-2">
            {brand.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Producto</span>
          <Link href="/ofrecemos" className="text-muted-foreground hover:text-foreground">
            Qué ofrecemos
          </Link>
          <Link href="/planes" className="text-muted-foreground hover:text-foreground">
            Planes
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Legal</span>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground">
            Términos
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
            Privacidad
          </Link>
        </div>

      </div>

      <div className="text-center text-xs text-muted-foreground pb-6">
        © {new Date().getFullYear()} {brand.name}. {brand.focus}.
      </div>
    </footer>
  )
}
