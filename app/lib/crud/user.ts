"use server";
import createSupabaseClient from "../supabase/client";

export async function createUser({ data }: { data: any }) {
  const supabase = await createSupabaseClient();
  const result = supabase
    .from("user")
    .insert({
      email: data.email,
      id: data.user_id,
    })
    .single();
  return result;
}

export async function getUser({ userId }: { userId: string }) {
  const supabase = await createSupabaseClient();
  const result = supabase.from("user").select("*").eq("id", userId);
  return result;
}
