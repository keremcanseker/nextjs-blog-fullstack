"use client";
//dropdown menu
import {
  Button,
  Switch,
  Link,
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
//icons
import { AiFillHome } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
//hooks
import { useUserStore } from "../utils/UserStore";
import { useThemeStore } from "../utils/ThemeStore";
import { logOut } from "../lib/auth/page";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { theme, setTheme } = useThemeStore();
  const router = useRouter();
  const handleLogout = async () => {
    const result = await logOut();
    router && router.push("/");
  };

  return (
    <section className="component_container justify-center">
      <div className="p-6 w-[650px] flex justify-between lg:flex-row lg:justify-between gap-4">
        <Link color="foreground" className="text-3xl">
          <AiFillHome className="inline-block mr-2" /> Welcome
        </Link>
        <Dropdown className=" " closeOnSelect>
          <DropdownTrigger>
            <Avatar
              as="button"
              src="/esmo.png"
              size="lg"
              icon={<AvatarIcon></AvatarIcon>}
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
              endContent={
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
