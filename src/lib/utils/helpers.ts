import { PostContent, PostContentSchema } from "@/types/post";
import DOMPurify from "isomorphic-dompurify";

export const formatDate = (date: Date) => {
  return new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(",", ""); // Remove the comma after the day
};

export async function getAuthorName(
  supabase: any,
  userId: string
): Promise<string> {
  const { data: userData, error } = await supabase
    .from("user")
    .select("user_name")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user data:", error.message);
    throw new Error("Error fetching user data");
  }

  return userData.user_name;
}

export async function parsePostContent(content: string): Promise<PostContent> {
  const parsedJSON = JSON.parse(content);

  // Transform keywords to array
  const keywordsArray: string[] = [];
  Object.keys(parsedJSON).forEach((key) => {
    if (key.startsWith("keywords[")) {
      keywordsArray.push(parsedJSON[key]);
      delete parsedJSON[key];
    }
  });
  parsedJSON.keywords = keywordsArray;

  const parsedContent = PostContentSchema.safeParse(parsedJSON);

  if (!parsedContent.success) {
    console.error("Error parsing post content:", parsedContent.error.errors);
    throw new Error("Error parsing post content");
  }
  const sanitizedContent = sanitizeContent(parsedContent.data.content);
  parsedContent.data.content = sanitizedContent;
  return parsedContent.data;
}

export function sanitizeContent(content: string): string {
  const sanitizedContent = DOMPurify.sanitize(content);
  return sanitizedContent;
}
