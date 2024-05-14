"use client";
import { showToastError, showToastSuccess } from "@/components/Toaster";
import { Button, Input } from "@nextui-org/react";
import { useTheme } from "@/lib/hooks/useTheme";
import { signUpWithEmail } from "@/lib/auth/auth";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await signUpWithEmail({
        email,
        password,
        username: userName,
      });
      const response = JSON.parse(result);
      // if there is no error show success toast
      if (!response.message) {
        showToastSuccess({ message: "Registeration successful", theme: theme });
        setTimeout(() => {
          redirect("/auth/sign-in");
        }, 1500);
      } else {
        showToastError({
          message: response.error.message || "Registration failed",
          theme: theme,
        });
      }
    } catch (error) {
      showToastError({ message: "Registeration failed", theme: theme });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="username"
        label="Username"
        radius="sm"
        className="mb-6"
        value={userName}
        onChange={(ev) => setUserName(ev.target.value)}
      />
      <Input
        type="email"
        label="Email"
        radius="sm"
        className="mb-6"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <Input
        type="password"
        label="Password"
        radius="sm"
        className="mb-1"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button
        className="mt-4 text-xl w-full"
        type="submit"
        variant="shadow"
        color="primary"
        radius="sm"
      >
        Register
      </Button>
    </form>
  );
}
