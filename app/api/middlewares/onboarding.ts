import { redirect } from "react-router";
import { getCurrentUser } from "../account/get-current-user";

export async function onboarding(request: Request) {
  const user = await getCurrentUser(request);

  if (!user?.has_onboarding) {
    return redirect("/onboarding");
  }

  return user;
}
