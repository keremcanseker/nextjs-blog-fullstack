"use client";
import { useTheme } from "@/lib/hooks/useTheme";
import { Link, Button, Input } from "@nextui-org/react";
import { signInWithEmail } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { showToastError } from "@/components/Toaster";
import { useState } from "react";
export default function SigninForm() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await signInWithEmail({ email, password });
      const response = JSON.parse(result);
      if (!response.message) {
        redirect("/");
      }

      showToastError({ message: response.message, theme: theme });
    } catch {
      showToastError({
        message: "Something is wrong with server please try again.",
        theme: theme,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input
        type="email"
        label="Email"
        className="mb-6"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <Input
        type="password"
        label="Password"
        className="mb-1"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <div className="flex px-1 mt-1 justify-between">
        <Link className="mt-1" color="foreground">
          Register
        </Link>
        <Link
          href="/signin"
          className="text-right mb-1 mt-1"
          color="foreground"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        className="mt-4 p-0 align-center  text-2xl"
        type="submit"
        color="primary"
        variant="shadow"
        radius="sm"
      >
        Sign In
      </Button>
    </form>
  );
}
