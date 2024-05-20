import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Home } from "@/components/Icons";
import Link from "next/link";
import NavbarDropDown from "@/components/NavbarDropDown";

export default function CustomNav({ className }: { className?: string }) {
  return (
    <Navbar shouldHideOnScroll className={`pt-4 ${className}`}>
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/" className="flex text-3xl justify-center items-center">
          <Home className="inline-block mr-2" /> Home
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarDropDown />
      </NavbarContent>
    </Navbar>
  );
}
