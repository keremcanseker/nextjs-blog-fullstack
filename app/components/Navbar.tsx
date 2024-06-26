"use client";
//dropdown menu
import {
  Button,
  Switch,
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
//icons
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

import { RxAvatar } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useThemeStore } from "../utils/ThemeStore";
import { logOut } from "../lib/auth/auth";
import { useRouter } from "next/navigation";
import { getUserProfileImage } from "../lib/actions/user";

// import lottie animations
// import { useRef, useEffect } from "react";
// import { LottieRefCurrentProps } from "lottie-react";
// import Lottie from "lottie-react";
// import dark from "../assets/dark.json";
export default function Navbar() {
  const [profileImage, setProfileImage] = useState(null);
  const { theme, setTheme } = useThemeStore();
  const router = useRouter();
  const profilePic = async () => {
    const user = await getUserProfileImage();
    setProfileImage(user?.profile_pic);
  };

  const handleLogout = async () => {
    const result = await logOut();
    router && router.push("/");
  };
  useEffect(() => {
    profilePic();
  }, []);

  return (
    <section className="mx-auto flex w-full justify-center ">
      <div className="p-6 max-w-[650px] w-full flex justify-between lg:flex-row lg:justify-between gap-4">
        <Link href="/" className="text-3xl">
          <AiFillHome className="inline-block mr-2" /> Welcome
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
              endContent={<RxAvatar className="text-2xl"></RxAvatar>}
              key="profile"
              href="/profile"
            >
              Profile
            </DropdownItem>
            <DropdownItem
              href="/post/create"
              endContent={
                <IoCreateOutline className="text-2xl"></IoCreateOutline>
              }
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
              endContent={<CiLogout className="text-2xl"></CiLogout>}
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
