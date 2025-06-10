import { auth } from "~/lib/auth";
import { db } from "../database";
import type { User } from "../types";
import { middlewares } from "../middlewares";

export async function getCurrentUser(request: Request, columns: string = "*") {
  const userId = await middlewares.authenticated(request);

  const { data } = await db
    .from("user")
    .select(columns)
    .eq("id", userId)
    .single();

  return data as User | null;
}

export async function getUserId(request: Request): Promise<string | null> {
  const session = await auth.api.getSession(request);
  return session?.user.id || null;
}
