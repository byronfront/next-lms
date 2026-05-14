"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOutAndRedirectHome } from "@/actions/auth-actions";

export function SignInWithProvider({ provider }: { provider: string }) {
  return (
    <Button className="w-full" variant="outline" onClick={() => signIn(provider)}>
      Continuar con {provider}
    </Button>
  );
}

export function SignIn() {
  return (
    <Button 
      className="w-full" 
      onClick={() => signIn("credentials", { callbackUrl: "/dashboard" })}
    >
      Iniciar sesión
    </Button>
  );
}

export function SignOut() {
  return (
    <form action={signOutAndRedirectHome}>
      <Button type="submit">Cerrar sesión</Button>
    </form>
  );
}