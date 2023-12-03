"use client";
import { Image, Button, Link } from "@nextui-org/react";
import { useLogInStore } from "@/app/utils/LogInStore";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useThemeStore } from "@/app/utils/ThemeStore";

const Welcome: React.FC = () => {
  const { theme } = useThemeStore();
  const { register, setRegister } = useLogInStore();

  const router = useRouter();
  const handleClick = () => {
    router.push("/signin");
    setRegister(!register);
  };
  return (
    <section>
      <section className="page_wrapper sm:flex-row flex-col items-center gap-10">
        <div className="max-w-[300px]">
          <Image src="/image.png" className="w-full shadow-2xl"></Image>
        </div>
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl  text-center">Welcome to the G Blog</h1>

          <Button
            className="w-full text-lg"
            color="primary"
            radius="sm"
            variant="shadow"
            data-hover=""
            onClick={handleClick}
          >
            Create account
          </Button>

          <div className="flex flex-col gap-2 w-full mt-6">
            <h1 className=" ">Already have an account? </h1>
            <Link
              href="/signin"
              className=""
              onClick={() => setRegister(false)}
            >
              <Button
                className="w-full text-lg"
                color="primary"
                radius="sm"
                variant="shadow"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};
export default Welcome;
