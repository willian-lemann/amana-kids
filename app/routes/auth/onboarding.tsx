import { Outlet, redirect } from "react-router";

import type { Route } from "./+types/protected";
import { getCurrentUser } from "~/api/account/get-current-user";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const user = await getCurrentUser(request);

  if (user?.has_onboarding) {
    return redirect("/");
  }

  return null;
};

export default function OnboardingLayout() {
  return <Outlet />;
}
