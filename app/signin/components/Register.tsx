"use client";
import { Button, Link, Input } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "@/app/utils/ThemeStore";
import { useLogInStore } from "@/app/utils/LogInStore";
import signUpWithEmail from "@/app/lib/auth/page";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRegister } = useLogInStore();
  const router = useRouter();
  const { theme } = useThemeStore();

  const showToastSuccess = () => {
    toast.success("You have sucessfully registered!", {
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
      // Make an API request to your server to register the user
      const result = await signUpWithEmail({ email, password });
      const response = JSON.parse(result);
      // if there is no error show success toast
      if (!response.message) {
        showToastSuccess();
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
      if (response.message) {
        showToastError(response.message);
      }
    } catch (error) {
      // Handle API request error, e.g., display an error message
      console.error("Registration error:", error);
      showToastError("Registeration failed");
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
            className="text-xl mb-6 "
          >
            Turn Login
          </Link>
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
          <ToastContainer />
        </form>
      </div>
    </section>
  );
};

export default Register;
