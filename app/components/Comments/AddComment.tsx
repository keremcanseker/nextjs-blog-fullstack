"use client";
import { postComment } from "@/app/lib/actions/comment";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function AddComment({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    setComment("");
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
            <Button className="" color="primary" onClick={handleSubmit}>
              Comment
            </Button>
          </div>
        }
      ></Input>
    </div>
  );
}
