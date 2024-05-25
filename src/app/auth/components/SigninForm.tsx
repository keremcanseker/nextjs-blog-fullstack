"use client";
import { useTheme } from "next-themes";
import { Link, Button, Input } from "@nextui-org/react";
import { signInWithEmail } from "@/lib/auth/auth";
import { showToastError } from "@/components/Toaster";
import { useRouter } from "next/navigation";
import { Theme } from "@/types/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import type { SigninForm } from "@/types/auth-forms";
export default function SigninForm() {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>();
  const onSubmit: SubmitHandler<SigninForm> = async (data) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) {
        router.push("/");
      } else {
        throw new Error("Failed Login");
      }
    } catch (error) {
      showToastError({
        message: "Server error, please try again later",
        theme: theme as Theme,
      });
    }
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };
  const buttonLabel = isSubmitting ? "Signing in..." : "Sign In";
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      <Input
        type="email"
        label="Email"
        className="mb-6"
        errorMessage={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Email is not valid",
          },
        })}
      />
      <Input
        type="password"
        label="Password"
        className="mb-1"
        {...register("password", { required: "Password is required" })}
        errorMessage={errors.password?.message}
      />
      <div className="flex px-1 mt-1 justify-between">
        <Link className="mt-1" color="foreground" href="/auth/sign-up">
          Register
        </Link>
        <Link href="/" className="text-right mb-1 mt-1" color="foreground">
          Forgot Password?
        </Link>
      </div>

      <Button
        className="mt-4 p-0 align-center  text-2xl"
        type="submit"
        color="primary"
        variant="shadow"
        radius="sm"
        disabled={isSubmitting}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
