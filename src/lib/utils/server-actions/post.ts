"use server";
import { getUserIdFromCurrentSession } from "@/lib/auth/auth";
import createSupabaseClient, {
  createSupabaseClientForStart,
} from "@/lib/supabase/client";
import {
  parsePostContent,
  getAuthorName,
  formatDate,
} from "@/lib/utils/helpers";

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import {
  CompletePostData,
  PostArraySchema,
  PostContent,
  PostSchema,
} from "@/types/post";
import { sanitizeContent } from "@/lib/utils/helpers";

export async function createPost({ data }: { data: PostContent }) {
  const supabase = await createSupabaseClient();
  const id = await getUserIdFromCurrentSession();
  if (!id) {
    return { success: false };
  }

  // Sanitize each field of the data object
  const sanitizedData: PostContent = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, sanitizeContent(value)];
      } else {
        return [key, value];
      }
    })
  );

  const postData = {
    content: JSON.stringify(sanitizedData), // Stringify the entire sanitizedData object
    user_id: id,
  };

  const result = await supabase.from("post").insert(postData).single();
  const success = result.statusText === "Created";
  return success ? { success: true } : { success: false };
}

export async function getPosts(): Promise<
  CompletePostData[] | { error: string }
> {
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("public", true);

  if (error) {
    console.error("Error fetching posts:", error);
    return { error: "Error fetching data" };
  }

  const parsedData = PostArraySchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Error parsing post data:", parsedData.error.errors);
    return { error: "Error parsing data" };
  }

  const completePosts = await Promise.all(
    parsedData.data.map(async (post) => {
      try {
        const parsedContent = await parsePostContent(post.content);
        const completePostData: CompletePostData = {
          ...parsedContent,
          created_at: post.created_at,
          author: await getAuthorName(supabase, post.user_id),
          keywords: parsedContent.keywords,
          post_id: post.post_id,
        };

        return completePostData;
      } catch (error) {
        console.error("Error processing post:", error);
        throw new Error("Error processing post data");
      }
    })
  );

  return completePosts;
}

export async function getPost({ postId }: { postId: string }) {
  const supabase = await createSupabaseClientForStart();

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    // Handle the error, for example, log it or throw an exception
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
  const parsedData = PostSchema.safeParse(data[0]);
  if (!parsedData.success) {
    console.error("Error parsing post data:", parsedData.error.errors);
    throw new Error("Error parsing post data");
  }

  const post = parsedData.data;
  const parsedContent = await parsePostContent(post.content);
  const completePostData: CompletePostData = {
    ...parsedContent,
    created_at: formatDate(new Date(post.created_at)),
    author: await getAuthorName(supabase, post.user_id),
    keywords: parsedContent.keywords,
    post_id: post.post_id,
  };

  return completePostData;
}

export async function getImageLinkforProfile({
  formData,
}: {
  formData: FormData;
}) {
  const userName = "kerem";
  const fileBuffer = formData.get("file") as File;
  const buffer = Buffer.from(await fileBuffer?.arrayBuffer());
  const newFileName = `${userName}-${Date.now().toString()}.${
    fileBuffer?.type.split("/")[1]
  }`;
  const params = {
    Bucket: "krmcnskrnew-blog-fusion",
    Key: newFileName,
    Body: buffer,
    ContentType: fileBuffer?.type,
    ACL: "public-read" as ObjectCannedACL,
  };

  const s3 = new S3Client({
    region: "us-east-1",

    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY_NEW || "",
      secretAccessKey: process.env.S3_SECRET_NEW || "",
    },
  });
  const url = `https://krmcnskrnew-blog-fusion.s3.amazonaws.com/${newFileName}`;
  try {
    const data = await s3.send(new PutObjectCommand({ ...params }));
    console.log("Image upload successful");
    return {
      success: true,
      url: url,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      url: "",
    };
  }
}

// create image
export async function getImageLink({ formData }: { formData: FormData }) {
  // console.log("yeni image request ");
  const fileBuffer = formData.get("file") as File;
  const buffer = Buffer.from(await fileBuffer?.arrayBuffer());
  // console.log(buffer);
  const title = formData
    .get("title")
    ?.toString()
    .replace(/\s+/g, "-")
    .toLowerCase();

  const newFileName = `${title}-${Date.now().toString()}.${
    fileBuffer?.type.split("/")[1]
  }`;
  // console.log(newFileName);

  const params = {
    Bucket: "krmcnskrnew-blog-fusion",
    Key: newFileName,
    Body: buffer,
    ContentType: fileBuffer?.type,
    ACL: "public-read" as ObjectCannedACL,
  };

  const s3 = new S3Client({
    region: "us-east-1",

    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY_NEW || "",
      secretAccessKey: process.env.S3_SECRET_NEW || "",
    },
  });
  const url = `https://krmcnskrnew-blog-fusion.s3.amazonaws.com/${newFileName}`;
  try {
    const data = await s3.send(new PutObjectCommand({ ...params }));
    console.log("Image upload successful");
    return {
      success: true,
      url: url,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      url: "",
    };
  }
}

//delete post
export async function deletePost({ postId }: { postId: string }) {
  // check if the post belongs to currenct user

  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("post")
    .select("user_id")
    .eq("post_id", postId);
  if (error) {
    return {
      error: "No post found",
    };
  }
  const user = await getUserIdFromCurrentSession();
  if (data[0].user_id !== user) {
    return {
      error: "You are not authorized to delete this post",
    };
  }

  const result = await supabase.from("post").delete().eq("post_id", postId);
  return {
    succes: true,
  };
}

export async function changePostVisibility({
  postId,
  visibility,
}: {
  postId: string;
  visibility: boolean;
}) {
  const supabase = await createSupabaseClient();
  //check if the post belongs to current user
  const { data, error } = await supabase
    .from("post")
    .select("user_id")
    .eq("post_id", postId);
  if (error) {
    return {
      error: "No post found",
    };
  }
  const user = await getUserIdFromCurrentSession();
  if (data[0].user_id !== user) {
    return {
      error: "You are not authorized to change visibility of this post",
    };
  }

  const { data: updateData, error: updateError } = await supabase
    .from("post")
    .update({ public: visibility })
    .eq("post_id", postId);

  if (updateError) {
    return {
      error: "Error updating post visibility",
    };
  }

  return {
    success: true,
  };
}

export async function updatePost({
  data,
  postId,
}: {
  data: FormData;
  postId: string;
}) {
  const supabase = await createSupabaseClient();
  const user = await getUserIdFromCurrentSession();
  if (!user) {
    return {
      error: "You are not authorized to update this post",
    };
  }
  // check if post belongs the user
  const { data: postData, error: postError } = await supabase
    .from("post")
    .select("user_id")
    .eq("post_id", postId);
  if (postError) {
    return {
      error: "No post found",
    };
  }
  if (postData[0].user_id !== user) {
    return {
      error: "You are not authorized to update this post",
    };
  }

  const { data: result, error: resultError } = await supabase
    .from("post")
    .update({
      content: JSON.stringify(Object.fromEntries(data)),
    })
    .eq("post_id", postId)
    .single();
  if (resultError) {
    return {
      error: "Error updating post",
    };
  }
  return {
    success: true,
  };
}
