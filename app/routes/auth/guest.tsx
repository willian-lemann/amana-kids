import { Outlet, redirect } from "react-router";

import type { Route } from "./+types/guest";
import { getCurrentUser } from "~/api/account/get-current-user";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await getCurrentUser(request);

  if (user) {
    return redirect("/");
  }

  return null;
};

export default function GuestLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Outlet />
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/kids-background.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
