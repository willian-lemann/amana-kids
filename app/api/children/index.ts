import type { SupabaseClient } from "@supabase/supabase-js";

// Define the type for a child
export type Child = {
  id?: number;
  full_name: string;
  age: number;
  parent_phone: string;
  goes_to_bathroom_alone: boolean;
  authorize_bathroom_help: boolean;
  food_restrictions?: string;
  known_allergies?: string;
  image_authorization: boolean;
  additional_notes?: string;
  parent_id?: string;
};

export async function createChild(db: SupabaseClient, input: Child) {
  const { id, ...restInput } = input;
  const { error } = await db.from("child").insert(restInput);
  if (error) {
    return { error };
  }
}

export async function getChildren(db: SupabaseClient) {
  const { data, error } = await db.from("child").select("*");
  return { data, error };
}

export async function getChild(db: SupabaseClient, id: string) {
  const { data, error } = await db
    .from("child")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function updateChild(
  db: SupabaseClient,
  id: string,
  input: Partial<Child>
) {
  const { data, error } = await db
    .from("child")
    .update(input)
    .eq("id", id)
    .single();

  return { data, error };
}

export async function deleteChild(db: SupabaseClient, id: string) {
  const { error } = await db.from("child").delete().eq("id", id);
  return { error };
}
