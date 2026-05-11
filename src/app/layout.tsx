import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { brand, brandMetadataTitle } from "@/lib/brand"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: brandMetadataTitle,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
// 
// npx prisma migrate reset --force      // resetear la base de datos
// npx prisma migrate dev --name init    // crear las migraciones
// npx prisma db push                    // aplicar las migraciones a la base de datos
// npx prisma generate                   // generar los modelos de la base de datos
// npx prisma db seed                    // crear los datos de prueba

