import type { SupabaseClient } from "@supabase/supabase-js";

type Input = {
  name: string;
  cap: number;
  verse: number;
};

export async function createVerse(db: SupabaseClient, input: Input) {
  const { error } = await db.from("verses").insert(input);

  if (error) {
    return { error };
  }
}
