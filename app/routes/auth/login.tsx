import { Form, Link, useNavigate } from "react-router";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          // show loading state
        },
        onSuccess: (ctx) => {
          navigate("/");
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error));
        },
      }
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <Form onSubmit={signIn} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login da sua conta</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Entre com seu email e senha para acessar sua conta.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link to="/signup" className="underline underline-offset-4">
              Registrar
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
