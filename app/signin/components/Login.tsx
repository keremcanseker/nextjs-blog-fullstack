"use client";
import { useState } from "react";
import { renderURL } from "@/app/types/ApiUrl";
import { Link, Button, Input } from "@nextui-org/react";
import { useUserStore } from "@/app/utils/UserStore";
import { useLogInStore } from "@/app/utils/LogInStore";
import { signInWithEmail } from "@/app/lib/auth/page";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "@/app/utils/ThemeStore";

import { useRouter } from "next/navigation";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { theme } = useThemeStore();
  const { isLoggedIn, setLoggedIn } = useUserStore();
  const { setRegister } = useLogInStore();

  const showToastSuccess = () => {
    toast.success("Login successfull!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip,
      theme: theme,
    });
  };

  const showToastError = (err: string) => {
    toast.error(`${err}`, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const result = await signInWithEmail({ email, password });
      const response = JSON.parse(result);
      // if there is no error show success toast
      if (!response.message) {
        showToastSuccess();
        setTimeout(() => {
          router.push("/");
        }, 650);
      }
      if (response.message) {
        showToastError(response.message);
      }
    } catch {
      showToastError("Login failed");
    }
  };
  return (
    <section className="form_wrapper items-center ">
      <div className="border flex flex-col dark:border-gray-800 light:border-gray-300 bg-[var(--primary)]  p-6 w-full rounded-xl ">
        <Link href="/" className="text-xl mb-6 " color="foreground">
          Turn back
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
          <div className="flex sm:flex-row flex-col justify-between">
            <Link
              href="/forgot-password"
              className="text-right mb-1 mt-1"
              color="foreground"
            >
              Forgot Password?
            </Link>
            <Link
              onClick={() => setRegister(true)}
              className="mt-1"
              color="foreground"
            >
              Don't have an account?
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
          <ToastContainer />
        </form>
      </div>
    </section>
  );
};
export default Login;
