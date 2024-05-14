import { z, ZodType } from "zod";

export const vercelURL = "https://blog-fusion-api.vercel.app";
export const renderURL = "http://localhost:5000";

export type PostData = {
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  post_id: string;
};

export const PostDataSchema: ZodType<PostData[]> = z.array(
  z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
    category: z.string(),
    image: z.string(),
    post_id: z.string(),
  })
);

export type Post = {
  title: string;
  content: string;
  created_at: string;
  image: string;
  keywords: string[];
  author: string;
};
