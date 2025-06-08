import type { SupabaseClient } from "@supabase/supabase-js";

export async function finishOnboarding(db: SupabaseClient, userId: string) {
  const { error } = await db
    .from("user")
    .update({ has_onboarding: true })
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }
}
