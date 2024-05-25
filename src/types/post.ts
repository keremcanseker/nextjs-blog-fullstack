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
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" })
    .max(50, { message: "Title must be less than 50 characters long" }),
  summary: z
    .string()
    .min(10, { message: "Keywords must be at least 10 characters long" })
    .max(150, { message: "Keywords must be less than 150 characters long" }),
  image: z.string(),
  content: z.string(),
  keywords: z.union([
    z.array(z.string().min(3).max(20)),
    z.string().min(3).max(20),
  ]),
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
