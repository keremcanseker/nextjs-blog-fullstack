import { z } from "zod";

const SignupFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string(),
});

const SigninFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignupForm = z.infer<typeof SignupFormSchema>;
type SigninForm = z.infer<typeof SigninFormSchema>;

export { SignupFormSchema, SigninFormSchema };
export type { SignupForm, SigninForm };
