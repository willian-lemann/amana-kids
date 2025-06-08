import { auth } from "~/lib/auth";
import { db } from "../database";
import type { User } from "../types";

export async function getCurrentUser(request: Request) {
  const session = await auth.api.getSession(request);

  if (!session) {
    return null;
  }

  const { data } = await db
    .from("user")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return data as User;
}

export async function getUserId(request: Request): Promise<string | null> {
  const session = await auth.api.getSession(request);
  return session?.user.id || null;
}
