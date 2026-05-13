"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { brand } from "@/lib/brand"

function loginErrorMessage(error: string | undefined, code: string | undefined) {
  if (error === "CredentialsSignin" || code === "credentials") {
    return "Correo o contraseña incorrectos."
  }
  if (error) {
    return "No se pudo iniciar sesión. Revisa AUTH_SECRET, la base de datos y los logs del servidor."
  }
  return "No se pudo iniciar sesión. Inténtalo de nuevo."
}

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signInWithCredentials() {
    setError(null)
    setLoading(true)
    try {
      // Debe ser URL absoluta: con redirect:false, next-auth hace new URL(data.url)
      // y una ruta relativa como "/dashboard" rompe el cliente (TypeError).
      const afterLogin = `${window.location.origin}/dashboard`
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        callbackUrl: afterLogin,
        redirect: false,
      })

      if (result?.ok === true) {
        window.location.assign(result.url ?? afterLogin)
        return
      }

      setError(loginErrorMessage(result?.error, result?.code))
    } catch {
      setError(
        "Error al contactar el servidor de autenticación. Comprueba que la app esté en marcha y que exista AUTH_SECRET."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen mesh-page-bg">

      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-none shadow-none">

          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Bienvenido a {brand.name}
            </CardTitle>
            <CardDescription>
              Escribe tu correo y contraseña para entrar.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <div className="space-y-2">
              <Input
                placeholder="Correo electrónico"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="Contraseña"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full"
              disabled={loading}
              type="button"
              onClick={() => void signInWithCredentials()}
            >
              {loading ? "Entrando…" : "Iniciar sesión"}
            </Button>

            <div className="space-y-2 pt-2">
              <Button
                className="w-full"
                variant="outline"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  })
                }
              >
                Continuar con Google
              </Button>

              <Button
                className="w-full"
                variant="outline"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  })
                }
              >
                Continuar con GitHub
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-2 space-y-1">
              <div>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div>
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      <div className="auth-hero-panel hidden md:flex min-h-full items-center justify-center text-white">

        <div className="pointer-events-none absolute inset-0 z-[2] bg-black/35" />

        <div className="relative z-[3] text-center px-10">
          <h2 className="text-3xl font-bold">Todo tu material, ordenado</h2>
          <p className="text-white/60 mt-4">{brand.hero}</p>
        </div>

      </div>

    </div>
  )
}
