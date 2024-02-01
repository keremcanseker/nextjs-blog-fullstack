"use client";
import { postComment } from "@/app/lib/actions/comment";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import DOMPurify from "dompurify";

export default function AddComment({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    "test comment";
    setComment("");
    // reload the page
    const reloadPage = () => {
      window.location.reload();
    };
    reloadPage();
    const cleanComment = DOMPurify.sanitize(comment);
    postComment(cleanComment, id);
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
              isIconOnly
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
