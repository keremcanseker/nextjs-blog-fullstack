"use client";
import CustomNav from "@/app/components/CustomNav";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import { deletePost } from "@/app/lib/actions/post";
import { showToastError, showToastSuccess } from "@/app/components/Toaster";
import { useThemeStore } from "@/app/utils/ThemeStore";
export default function Delete() {
  const searchParams = useSearchParams();
  const { theme } = useThemeStore();

  const search = searchParams.get("id");

  const handleNo = () => {
    window.history.back();
  };
  const handleDelete = async () => {
    const res = await deletePost({ postId: search || "" });
    if (res) {
      showToastSuccess({ message: "Post deleted successfully", theme: theme });
      window.location.href = "/";
    } else {
      showToastError({ message: "Something went wrong", theme: theme });
    }
  };
  return (
    <section className="flex flex-col">
      <CustomNav />
      <div className="flex flex-col mt-8 gap-2 ">
        <h1 className="text-lg">
          Are you sure you want to delete this post? This action can not be
          <strong> undone</strong>.
        </h1>
        <div className="flex gap-2 justify-center ">
          <Button color="primary" onClick={handleNo}>
            No
          </Button>
          <Button color="danger" variant="bordered" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </div>
    </section>
  );
}
