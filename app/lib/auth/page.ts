"use server";

import createSupabaseClient, {
  createSupabaseClientForStart,
} from "../supabase/client";

// SIGNUP WITH EMAIL
export default async function signUpWithEmail({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const user_id = data.user?.id;

  const result = await supabase
    .from("user")
    .insert([{ user_name: username, user_id: user_id, email: email }]);

  if (error) {
    console.log(error.message);
    return JSON.stringify(error);
  }

  return JSON.stringify(data);
}

// GET SESSION
export async function getUserSession() {
  const supabase = await createSupabaseClientForStart();
  return await supabase.auth.getSession();
}

// LOGOUT
export async function logOut() {
  const supabase = await createSupabaseClient();
  console.log("test");
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

// get user data with id
export async function getUserWithId(id: string) {
  const supabase = await createSupabaseClient();
  const data = await supabase.from("user").select("*").eq("user_id", id);
  // console.log(data);
  return data;
}

// get user id from session
export async function getUserIdFromCurrentSession() {
  const supabase = await createSupabaseClientForStart();
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id;
}

export async function checkIfPostBelongsToCurrentUser(post_id: string) {
  console.log("check if post belongs to current user");
  const supabase = await createSupabaseClientForStart();
  const user_id = await getUserIdFromCurrentSession();
  // check if post belongs to current user
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("post_id", post_id);
  // console.log(data);
  if (error) {
    console.log(error.message);
    return false;
  }
  if (data[0].user_id === user_id) {
    return true;
  }
  return false;
}
