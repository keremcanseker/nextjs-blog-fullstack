"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import "@/app/styles/globals.css";
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        500
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
        Something&apos;s wrong
      </h2>
      <p>Sorry, there was an error on the server. Please try again later.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()}>Go back</Button>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    </div>
  );
}
