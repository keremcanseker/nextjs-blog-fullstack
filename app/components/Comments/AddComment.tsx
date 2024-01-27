"use client";
import { postComment } from "@/app/lib/actions/comment";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function AddComment({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    setComment("");
    // reload the page
    const reloadPage = () => {
      window.location.reload();
    };
    reloadPage();

    postComment(comment, id);
    // after submitting re-render the comments
  };

  return (
    <div className="flex  gap-2 bg-slate-400 p-2 bg-opacity-20 rounded-lg">
      <Avatar size="lg"></Avatar>

      <Input
        variant="underlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        endContent={
          <div className="flex gap-2">
            <Button
              className="px-0"
              size="sm"
              variant="solid"
              color="primary"
              onClick={handleSubmit}
            >
              <IoSend></IoSend>
            </Button>
          </div>
        }
      ></Input>
    </div>
  );
}
