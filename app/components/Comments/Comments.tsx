"use client";
import { Card, CircularProgress } from "@nextui-org/react";
import CardComment from "./CardComment";
import AddComment from "./AddComment";
import { getComments } from "@/app/lib/actions/comment";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

export default function Comments({ id }: { id: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();
  const getFromAndTo = () => {
    const ITEMS_PER_PAGE = 5;
    let from = page * ITEMS_PER_PAGE;
    let to = from + ITEMS_PER_PAGE;
    if (page > 0) {
      from += 1;
    }
    return { from, to };
  };

  const fetchData = async () => {
    const { from, to } = getFromAndTo();
    const newComments = await getComments(id, from, to);
    if (newComments.length === 0) {
      setLoading(false);
    } else {
      setPage(page + 1);
      setComments((prevComments) => [...prevComments, ...newComments]);
    }
  };

  useEffect(() => {
    if (inView && loading) {
      setLoading(true);
      fetchData();
    }
  }, [inView, loading]);

  return (
    <div className="flex flex-col gap-4 w-full h-auto">
      {/* <div ref={ref} className="flex flex-col gap-4 w-full"> */}
      <h1 className="text-xl font-semibold mb-5">Leave a comment</h1>
      <AddComment id={id}></AddComment>
      {comments.map((comment, index) => (
        <CardComment
          key={index}
          commentId={comment.comment_id}
          userId={comment.user_id}
          content={comment.content}
          last_edited={comment.last_edited}
          likes={comment.likes}
        ></CardComment>
      ))}

      {loading && <CircularProgress className="mx-auto" ref={ref} />}
    </div>
  );
}
