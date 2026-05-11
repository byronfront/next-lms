"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

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
    <Button onClick={() => signOut()}>
      Cerrar sesión
    </Button>
  );
}