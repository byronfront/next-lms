import Link from "next/link"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-3xl font-bold">Ajustes</h1>
        <p className="text-muted-foreground">
          Tu perfil en la plataforma de IA para desarrollo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Nombre:</span>{" "}
            {session.user.name ?? "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            {session.user.email}
          </p>
          <p>
            <span className="text-muted-foreground">Rol:</span>{" "}
            {session.user.role}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1 min-w-[200px]">
            Tema claro u oscuro. Al entrar por primera vez se respeta la
            preferencia del sistema.
          </p>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Si inicias sesión con email y contraseña, puedes restablecerla por
            correo.
          </p>
          <Button asChild variant="outline">
            <Link href="/forgot-password">Olvidé mi contraseña</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
