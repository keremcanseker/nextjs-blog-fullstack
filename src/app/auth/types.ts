import { z, ZodType } from "zod";
type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
  username: string;
};

export const loginSchema: ZodType<Login> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const registerSchema: ZodType<Register> = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().min(4, "Username must be at least 4 characters long"),
});
