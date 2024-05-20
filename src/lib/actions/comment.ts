"use server";
import createSupabaseClient from "../supabase/client";
export async function postComment(comment: string, postId: string) {
  const supabase = await createSupabaseClient();
  const id = (await supabase.auth.getUser()).data.user?.id;

  const { data, error } = await supabase
    .from("comments")
    .insert([{ content: comment, post_id: postId, user_id: id }])
    .single();
}

export async function getComments(
  postId: string,
  start: number,
  count: number
) {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*") // select content and user id
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .range(start, start + count - 1);
  if (error) {
    // Handle the error, for example, log it or throw an exception
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
  return data;
}

// increase like count by 1
export async function increaseLike(commentId: string) {
  const supabase = await createSupabaseClient();
  // console.log(commentId);
  // First, get the current like_count
  let { data: comment, error } = await supabase
    .from("comments")
    .select("likes")
    .eq("comment_id", commentId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }

  // Then, increase the like_count by 1
  const { data, error: updateError } = await supabase
    .from("comments")
    .update({ likes: comment!.likes + 1 })
    .eq("comment_id", commentId)
    .single();

  if (updateError) {
    console.error("Error updating data:", updateError);
    throw new Error("Error updating data");
  } else {
    // return ok status
    return { status: "ok" };
  }
}

// decrease like count by 1
export async function decreaseLike(commentId: string) {
  const supabase = await createSupabaseClient();
  // console.log(commentId);
  // First, get the current like_count
  let { data: comment, error } = await supabase
    .from("comments")
    .select("likes")
    .eq("comment_id", commentId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }

  // Then, decrease the like_count by 1
  const { data, error: updateError } = await supabase
    .from("comments")
    .update({ likes: comment!.likes - 1 })
    .eq("comment_id", commentId)
    .single();

  if (updateError) {
    console.error("Error updating data:", updateError);
    throw new Error("Error updating data");
  } else {
    // return ok status
    return { status: "ok" };
  }
}
