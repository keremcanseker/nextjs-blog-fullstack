import { z, ZodType } from "zod";

export type createPost = {
  title: string;
  keywords: string;
  summary: string;
  image: string;
  content?: string;
};

export const createPostSchema: ZodType<createPost> = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" })
    .max(50, { message: "Title must be less than 50 characters long" }),
  keywords: z
    .string()

    .min(2, { message: "Keywords must be at least 2 characters long" })
    .max(20, { message: "Keywords must be less than 20 characters long" }),

  summary: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters long" })
    .max(150, { message: "Summary must be less than 150 characters long" }),
  image: z.string(),
  // this is a html string
  content: z.string(),
});
