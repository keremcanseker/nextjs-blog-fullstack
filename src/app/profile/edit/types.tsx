import { z, ZodType } from "zod";
export type UserFormData = {
  fullName: string;
  bio: string;
  username: string;
  image: string;
};
export const schema: ZodType<UserFormData> = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  bio: z.string().max(100, "Bio must be at most 100 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  image: z.string().url("Invalid image url"),
});
