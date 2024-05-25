"use client";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AvatarIconLocal, Create, Logout, Sun, Moon } from "@/components/Icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfileImage } from "@/lib/utils/server-actions/user";
import { logOut } from "@/lib/auth/auth";
import { useTheme } from "next-themes";
export default function NavbarDropDown() {
  const { theme, setTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();
  const handleProfilePic = async () => {
    const user = await getUserProfileImage();
    setProfileImage(user?.profile_pic);
  };

  const handleLogout = async () => {
    const result = await logOut();
    result && router.push("/");
  };

  const themeIcon =
    theme === "dark" ? (
      <Moon className="text-2xl"></Moon>
    ) : (
      <Sun className="text-2xl"></Sun>
    );
  useEffect(() => {
    handleProfilePic();
  }, []);

  return (
    <Dropdown className=" " closeOnSelect>
      <DropdownTrigger>
        <Avatar as="button" size="lg" src={profileImage!} showFallback></Avatar>
      </DropdownTrigger>

      <DropdownMenu
        closeOnSelect={false}
        variant="shadow"
        color="primary"
        className=" "
        aria-label="Action event example"
      >
        <DropdownItem
          endContent={<AvatarIconLocal className="text-2xl"></AvatarIconLocal>}
          key="profile"
          href="/profile"
        >
          Profile
        </DropdownItem>
        <DropdownItem
          href="/post/createnew
            "
          endContent={<Create className="text-2xl"></Create>}
          key="new"
        >
          Create Post
        </DropdownItem>
        <DropdownItem
          className="flex flex-row justify-between items-center  "
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          endContent={themeIcon}
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
  );
}
