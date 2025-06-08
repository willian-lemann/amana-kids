import { Form, Link, useNavigate } from "react-router";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name,

        callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
      },

      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          navigate("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast("Erro ao registrar conta", {
            description: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <Form onSubmit={signUp} className={cn("flex flex-col gap-6")}>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Registro da conta no Amana kids
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              Crie sua conta para acessar o Amana kids.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="meuemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Nome</Label>
              <Input
                id="name"
                type="name"
                placeholder="Sue nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="*****"
              />
            </div>

            <Button loading={isLoading} type="submit" className="w-full">
              Criar conta
            </Button>
          </div>
          <div className="text-center text-sm">
            Ir para o{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
