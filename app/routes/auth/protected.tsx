import { Outlet, redirect, useNavigate, useNavigation } from "react-router";

import type { Route } from "./+types/protected";

import { Calendar, HomeIcon, Users } from "lucide-react";

import { Button } from "~/components/ui/button";

import { Can } from "~/components/can";

import { Link } from "react-router";
import { logout } from "~/api/account/logout";
import { middlewares } from "~/api/middlewares";

import { LoadingSpinner } from "~/components/ui/loading";
import type { User } from "~/api/types";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await middlewares.authenticated(request);
  const user = await middlewares.onboarding(request);

  return {
    currentUser: user as User,
  };
};

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
  const { currentUser } = loaderData;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="bg-gradient-to-r from-[#20b2fe] via-90% to-[#20b2fe] text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Amana Kids</h1>
            <p className="text-blue-100 text-sm">Igreja Amana</p>
          </div>

          <Button
            onClick={() => {
              logout({ onSuccess: () => navigate("/login") });
            }}
            variant="ghost"
          >
            Sair
          </Button>
        </div>

        <div className="mt-4 bg-white/10 rounded-2xl p-3">
          <p className="text-sm font-medium">Bem-vindo(a)! 👋</p>
          <p className="text-xs text-blue-100">
            Que bom ter você aqui conosco hoje!
          </p>
        </div>
      </div>

      {isNavigating ? <LoadingSpinner /> : <Outlet context={currentUser} />}
    </div>
  );
}
