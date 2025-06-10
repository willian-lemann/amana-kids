import { redirect } from "react-router";
import { getUserId } from "../account/get-current-user";

export async function authenticated(request: Request) {
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/login", { status: 401 });
  }

  return userId;
}
