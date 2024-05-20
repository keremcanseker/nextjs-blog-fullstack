"use server";
import { UserFormData } from "@/app/profile/edit/types";
import { checkForSession, getUserIdFromCurrentSession } from "@/lib/auth/auth";
import createSupabaseClient, {
  createSupabaseClientForStart,
} from "@/lib/supabase/client";

//unused
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

export async function updateUser(data: UserFormData) {
  const userId = await getUserIdFromCurrentSession();
  const supabase = await createSupabaseClient();
  console.log("update request");
  if (userId === null)
    return {
      error: "User not logged in",
    };

  const { data: result, error: resultError } = await supabase
    .from("user")
    .update({
      user_name: data.username,
      profile_pic: data.image,
      fullName: data.fullName,
      bio: data.bio,
    })
    .eq("user_id", userId)
    .single();

  if (resultError) {
    console.log(resultError.message);
    return {
      error: resultError.message.toLowerCase(),
    };
  }
  return {
    success: true,
  };
}

export async function getUserProfile() {
  const userId = await getUserIdFromCurrentSession();
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase
    .from("user")
    .select("user_name, profile_pic, fullName, bio")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(error.message);
    return JSON.stringify(error);
  }
  // If data is null, assign an empty object
  const userData = data || {};

  // If the properties are null, assign an empty string
  userData.user_name = userData.user_name || "";
  userData.profile_pic = userData.profile_pic || "";
  userData.fullName = userData.fullName || "";
  userData.bio = userData.bio || "";

  return userData;
}
//: Promise<PostData[]>
export async function getUserPosts() {
  const userId = await getUserIdFromCurrentSession();
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase
    .from("post")
    .select("content, post_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const result = data?.map((post) => {
    const newData = JSON.parse(post.content);
    const keywordsArray = [];
    for (const key in newData) {
      if (key.startsWith("keywords[") && typeof newData[key] === "string") {
        const cleanedKeyword = newData[key].replace(/[^a-zA-Z ]/g, "");
        keywordsArray.push(cleanedKeyword);
      }
    }

    newData.keywords = keywordsArray;

    return { post_id: post.post_id, ...newData, created_at: post.created_at };
  });
  return result!;
  // return result;
}

export async function getUserProfileImage() {
  const session = await checkForSession();
  if (!session) {
    return null;
  }
  const userId = await getUserIdFromCurrentSession();
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase
    .from("user")
    .select("profile_pic")
    .eq("user_id", userId)
    .single();

  return data;
}

export async function getUserProfileName() {
  const userId = await getUserIdFromCurrentSession();
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase
    .from("user")
    .select("user_name")
    .eq("user_id", userId)
    .single();

  return data?.user_name || "";
}
