"use client";
import { Link } from "@nextui-org/react";
import { Back } from "./Icons";
import { useRouter } from "next/navigation";

interface ArrowBackProps {
  label: string;
  className?: string;
}

export default function ArrowBack({ label, className }: ArrowBackProps) {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <Link
      color="foreground"
      onClick={goBack}
      className={`text-lg mb-5 cursor-pointer ${className}`}
    >
      <Back className="inline-block " />
      {label}
    </Link>
  );
}

export function ArrowHome() {
  const router = useRouter();
  const goHome = () => router.push("/");
  return (
    <Link
      color="foreground"
      onClick={goHome}
      className="text-lg mb-5 cursor-pointer"
    >
      <Back className="inline-block " />
      Home
    </Link>
  );
}
