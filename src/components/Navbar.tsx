"use client";
import {
  Switch,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Home, Create, AvatarIconLocal, Logout } from "@/components/Icons";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/hooks/useTheme";
import { logOut } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { getUserProfileImage } from "../lib/actions/user";

export default function Navbar() {
  const [profileImage, setProfileImage] = useState(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const profilePic = async () => {
    const user = await getUserProfileImage();
    setProfileImage(user?.profile_pic);
  };

  const handleLogout = async () => {
    const result = await logOut();
    result && router.push("/");
  };
  useEffect(() => {
    profilePic();
  }, []);

  return (
    <section className="mx-auto flex w-full justify-center ">
      <div className="p-6 max-w-[650px] w-full flex justify-between lg:flex-row lg:justify-between gap-4">
        <Link href="/" className="text-3xl">
          <Home className="inline-block mr-2" /> Welcome
        </Link>
        <Dropdown className=" " closeOnSelect>
          <DropdownTrigger>
            <Avatar
              as="button"
              size="lg"
              src={profileImage!}
              showFallback
            ></Avatar>
          </DropdownTrigger>

          <DropdownMenu
            closeOnSelect={false}
            variant="shadow"
            color="primary"
            className=" "
            aria-label="Action event example"
          >
            <DropdownItem
              endContent={
                <AvatarIconLocal className="text-2xl"></AvatarIconLocal>
              }
              key="profile"
              href="/profile"
            >
              Profile
            </DropdownItem>
            <DropdownItem
              href="/post/create"
              endContent={<Create className="text-2xl"></Create>}
              key="new"
            >
              Create Post
            </DropdownItem>
            <DropdownItem
              className="flex flex-row justify-between items-center  "
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              endContent={
                // <Lottie
                //   animationData={dark}
                //   loop={false}
                //   autoplay={false}
                //   className="w-[100px] p-0 -mr-2"
                //   style={{ cursor: "pointer" }}
                //   lottieRef={lottieRef}
                // ></Lottie>
                <Switch
                  size="sm"
                  className="w-10"
                  color="secondary"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                ></Switch>
              }
              key="save"
            >
              Theme
            </DropdownItem>

            <DropdownItem
              endContent={<Logout className="text-2xl"></Logout>}
              key="logout"
              color="danger"
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </section>
  );
}
