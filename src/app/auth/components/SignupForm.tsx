"use client";
import { showToastError, showToastSuccess } from "@/components/Toaster";
import { Button, Input } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Theme } from "@/types/theme";
import { signUpWithEmail } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import type { SignupForm } from "@/types/auth-forms";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();
  const { theme } = useTheme();
  const router = useRouter();
  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    try {
      const result = await signUpWithEmail(data);
      const response = JSON.parse(result);

      if (!response.message) {
        showToastSuccess({
          message: "Registration successful",
          theme: theme as Theme,
        });
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 1500);
      } else {
        throw new Error(response.error.message || "Registration failed");
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

  const buttonLabel = isSubmitting ? "Signing up..." : "Sign Up";

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        type="username"
        label="Username"
        radius="sm"
        className="mb-6"
        {...register("username", { required: "Username is required" })}
        errorMessage={errors.username?.message}
      />
      <Input
        type="email"
        label="Email"
        radius="sm"
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
        radius="sm"
        className="mb-1"
        errorMessage={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
      />
      <Button
        className="mt-4 text-xl w-full"
        type="submit"
        variant="shadow"
        color="primary"
        radius="sm"
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
