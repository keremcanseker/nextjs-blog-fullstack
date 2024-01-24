"use server";
import createSupabaseClient, {
  createSupabaseClientForStart,
} from "../supabase/client";

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

export async function createPost({ data }: { data: FormData }) {
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

export async function getPosts() {
  const supabase = await createSupabaseClientForStart();
  const result = supabase.from("post").select("*");

  return result;
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
    console.log(userData)
    console.error("Error fetching user data:", userError);
    throw new Error("Error fetching user data");
  }

  

  // Check if data is not null before accessing its properties
  if (data && data.length > 0 && data[0].content) {
    // parse the data to JSON
    let newData = JSON.parse(data[0].content);
    // append the created_at property at the top level
    newData.created_at = data[0].created_at;
    newData.author = userData[0].fullName;
    return newData;
  } else {
    // Handle the case where data is null or empty
    console.error("No data found for postId:", postId);
    throw new Error("No data found");
  }
}

export async function deletePost({ postId }: { postId: string }) {
  const supabase = await createSupabaseClient();
  const result = supabase.from("post").delete().eq("id", postId);
  return result;
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
