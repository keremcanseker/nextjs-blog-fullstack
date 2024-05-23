import { z } from "zod";

// bu contentin ici title summary image  content
//post_id content user_id created_at  public

const PostSchema = z.object({
  content: z.string(),
  post_id: z.string(),
  created_at: z.string(),
  user_id: z.string(),
  public: z.boolean(),
});

const PostContentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  image: z.string(),
  content: z.string(),
  keywords: z.array(z.string()),
});

const PostArraySchema = z.array(PostSchema);
const PostContentArraySchema = z.array(PostContentSchema);

export type Post = z.infer<typeof PostSchema>;
export type PostArray = z.infer<typeof PostArraySchema>;
export type PostContent = z.infer<typeof PostContentSchema>;
export type PostContentArray = z.infer<typeof PostContentArraySchema>;
export type CompletePostData = PostContent & {
  created_at: string;
  author: string;
  post_id: string;
};

export {
  PostSchema,
  PostArraySchema,
  PostContentSchema,
  PostContentArraySchema,
};
