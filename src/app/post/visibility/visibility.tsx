"use client";
import CustomNav from "@/app/components/CustomNav";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";

import { showToastError, showToastSuccess } from "@/app/components/Toaster";
import { useThemeStore } from "@/app/utils/ThemeStore";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { changePostVisibility } from "@/app/lib/actions/post";
export default function Visibility() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const { theme } = useThemeStore();

  const handlePublic = async () => {
    const res = await changePostVisibility({
      postId: search || "",
      visibility: true,
    });
    if (res.success) {
      showToastSuccess({ message: "Post is now public", theme: theme });
    } else {
      showToastError({ message: res.error || "", theme: theme });
    }
  };
  const handlePrivate = async () => {
    const res = await changePostVisibility({
      postId: search || "",
      visibility: false,
    });
    if (res.success) {
      showToastSuccess({ message: "Post is now private", theme: theme });
      // wait for 1 second
      setTimeout(() => {
        window.history.back();
      }, 1000);
    } else {
      showToastError({ message: res.error || "", theme: theme });

      setTimeout(() => {
        window.history.back();
      }, 1000);
    }
  };

  return (
    <section className="flex flex-col">
      <CustomNav />
      <div className="flex flex-col mt-8 gap-2 ">
        <h1 className="text-lg">
          Change the visibility of this post to public or private.
        </h1>
        <div className="flex gap-2 justify-center ">
          <Button
            color="primary"
            className="text-xl"
            isIconOnly
            onClick={handlePublic}
          >
            <MdOutlineVisibility></MdOutlineVisibility>
          </Button>
          <Button
            color="danger"
            className="text-xl"
            variant="bordered"
            isIconOnly
            onClick={handlePrivate}
          >
            <MdOutlineVisibilityOff></MdOutlineVisibilityOff>
          </Button>
        </div>
      </div>
    </section>
  );
}
