"use server";

import createSupabaseClient from "../supabase/client";

// SIGNUP WITH EMAIL
export default async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseClient();
  const result = await supabase.auth.signUp({
    email,
    password,
  });

  // bu kod user tablsouna idyi ekliyordu fakat bunu supabase tarafinda yapiyoruz artik
  // const user_id = result.data.user?.id;
  // const appendUser = await createUser({ data: { email, user_id } });
  // console.log(appendUser);

  if (result.error) {
    console.log(result.error.message);
    return JSON.stringify(result.error);
  }
  // console.log(result.error?.error);
  return JSON.stringify(result);
}

// GET SESSION
export async function getUserSession() {
  const supabase = await createSupabaseClient();

  return await supabase.auth.getSession();
}

// LOGOUT
export async function logOut() {
  const supabase = await createSupabaseClient();
  return await supabase.auth.signOut();
}

// SIGNIN WITH EMAIL
export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseClient();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(result);

  if (result.error) {
    // console.log(result.error.message);
    return JSON.stringify(result.error);
  }
  // console.log(result.error?.error);
  return JSON.stringify(result);
}
