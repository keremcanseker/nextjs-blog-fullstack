"use server";
import { getUserIdFromCurrentSession } from "../auth/page";
import createSupabaseClient, {
  createSupabaseClientForStart,
} from "../supabase/client";

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

export async function postPost({ data }: { data: FormData }) {
  const supabase = await createSupabaseClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  // console.log(id);
  const result = supabase
    .from("post")
    .insert({
      content: JSON.stringify(Object.fromEntries(data)),
      user_id: id,
    })
    .single();
  return result;
}
export type Post = {
  title: string;
  content: string;
  created_at: string;
  image: string;
  keywords: string[];
  author: string;
};
export async function getPosts(): Promise<Post[] | { error: string }> {
  const supabase = await createSupabaseClientForStart();
  const { data, error } = await supabase.from("post").select("*");

  if (error) {
    // Handle the error, for example, log it or throw an exception
    return {
      error: "Error fetching data",
    };
  }

  const postsWithKeywords = await Promise.all(
    data.map(async (post) => {
      // parse the content to JSON
      let newData = JSON.parse(post.content);

      // Extract keywords from newData and add them to an array
      const keywordsArray = [];
      for (const key in newData) {
        if (key.startsWith("keywords[") && typeof newData[key] === "string") {
          const cleanedKeyword = newData[key].replace(/[^a-zA-Z ]/g, "");
          keywordsArray.push(cleanedKeyword);
        }
      }

      // append the created_at property at the top level
      newData.created_at = post.created_at;

      // get the author's fullname using user_id
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("fullName")
        .eq("user_id", post.user_id);

      if (userError) {
        console.error("Error fetching user data:", userError);
        throw new Error("Error fetching user data");
      }

      newData.author = userData[0].fullName;
      newData.keywords = keywordsArray;

      return newData as Post; // Ensure the type is explicitly casted to Post
    })
  );

  return postsWithKeywords;
}

export async function getPost({ postId }: { postId: string }) {
  const supabase = await createSupabaseClientForStart();

  const { data, error } = await supabase
    .from("post")
    .select("content, created_at, user_id")
    .eq("post_id", postId);

  if (error) {
    // Handle the error, for example, log it or throw an exception
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }

  // get the fullname using user_id
  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("fullName")
    .eq("user_id", data[0].user_id);

  if (userError) {
    console.log(userData);
    console.error("Error fetching user data:", userError);
    throw new Error("Error fetching user data");
  }

  // Check if data is not null before accessing its properties
  if (data && data.length > 0 && data[0].content) {
    // parse the data to JSON
    let newData = JSON.parse(data[0].content);

    // Extract keywords from newData and add them to an array
    const keywordsArray = [];
    for (const key in newData) {
      if (key.startsWith("keywords[") && typeof newData[key] === "string") {
        const cleanedKeyword = newData[key].replace(/[^a-zA-Z ]/g, "");
        keywordsArray.push(cleanedKeyword);
      }
    }

    // append the created_at property at the top level
    newData.created_at = data[0].created_at;
    newData.author = userData[0].fullName;
    newData.keywords = keywordsArray;

    return newData;
  } else {
    // Handle the case where data is null or empty
    console.error("No data found for postId:", postId);
    throw new Error("No data found");
  }
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

  const result = supabase.from("post").delete().eq("post_id", postId);
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
