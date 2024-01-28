"use client";
import { Button, Link, Input } from "@nextui-org/react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useThemeStore } from "@/app/utils/ThemeStore";
import { useLogInStore } from "@/app/utils/LogInStore";
import { signUpWithEmail } from "@/app/lib/auth/auth";
import { useRouter } from "next/navigation";

import {
  ToastContainerComponent,
  showToastError,
  showToastSuccess,
} from "@/app/components/Toaster";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { setRegister } = useLogInStore();
  const router = useRouter();
  const { theme } = useThemeStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an API request to your server to register the user
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
          router.push("/");
        }, 1500);
      }
      if (response.message) {
        showToastError({ message: response.message, theme: theme });
      }
    } catch (error) {
      showToastError({ message: "Registeration failed", theme: theme });
    }
  };

  return (
    <section className="form_wrapper items-center">
      <div className="border flex flex-col dark:border-gray-800 light:border-gray-300  bg-[var(--primary)] p-6 w-full rounded-xl">
        <form onSubmit={handleSubmit}>
          <Link
            color="foreground"
            onClick={() => {
              setRegister(false);
            }}
            className="text-lg mb-5"
          >
            <IoArrowBack className="inline-block " />
            Login
          </Link>
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
          <ToastContainerComponent />
        </form>
      </div>
    </section>
  );
};

export default Register;
