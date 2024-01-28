"use client";

import {
  Navbar,
  Button,
  Switch,
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  NavbarContent,
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
import { LuMoon, LuSun } from "react-icons/lu";

export default function CustomNav({ className }: { className?: string }) {
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
    <Navbar shouldHideOnScroll className={`pt-4 ${className}`}>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/" className="flex text-3xl justify-center items-center">
          <AiFillHome className="inline-block mr-2" /> Home
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
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
              href="/post/createnew
              "
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
                theme === "dark" ? (
                  <LuMoon className="text-2xl"></LuMoon>
                ) : (
                  <LuSun className="text-2xl"></LuSun>
                )
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
      </NavbarContent>
    </Navbar>
  );
}
