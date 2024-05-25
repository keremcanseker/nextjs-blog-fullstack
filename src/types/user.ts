import { z } from "zod";

export const ProfileDataSchema = z.object({
  profile_pic: z.string().nullable().default(""),
  user_name: z.string().nullable().default(""),
  bio: z.string().nullable().default(""),
  fullName: z.string().nullable().default(""),
});

export type ProfileData = z.infer<typeof ProfileDataSchema>;
