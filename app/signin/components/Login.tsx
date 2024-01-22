"use client";
import { useState } from "react";
import { Link, Button, Input } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useLogInStore } from "@/app/utils/LogInStore";
import { signInWithEmail } from "@/app/lib/auth/page";
import {
  ToastContainerComponent,
  showToastSuccess,
  showToastError,
} from "@/app/components/Toaster";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "@/app/utils/ThemeStore";

import { useRouter } from "next/navigation";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { theme } = useThemeStore();
  const { setRegister } = useLogInStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const result = await signInWithEmail({ email, password });
      const response = JSON.parse(result);
      // if there is no error show success toast
      if (!response.message) {
        showToastSuccess({ message: "Login successful", theme: theme });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
      if (response.message) {
        showToastError({ message: response.message, theme: theme });
      }
    } catch {
      showToastError({ message: "Login failed", theme: theme });
    }
  };
  return (
    <section className="form_wrapper items-center ">
      <div className="border flex flex-col dark:border-gray-800 light:border-gray-300 bg-[var(--primary)]  p-6 w-full rounded-xl ">
        <Link href="/" className="text-lg mb-5" color="foreground">
          <IoArrowBack className="inline-block " /> Back
        </Link>
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
            <Link
              onClick={() => setRegister(true)}
              className="mt-1"
              color="foreground"
            >
              Register
            </Link>
            <Link
              href="/forgot-password"
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
          <ToastContainerComponent />
        </form>
      </div>
    </section>
  );
};
export default Login;
