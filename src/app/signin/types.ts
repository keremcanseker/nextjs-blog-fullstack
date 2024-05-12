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
  password: z.string().min(8),
  username: z.string().min(4),
});
