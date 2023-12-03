import { getPosts } from "@/app/lib/crud/post";
import PostCard from "./PostCard";
import Link from "next/link";
import { randomBytes } from "crypto";
import { Divider } from "@nextui-org/react";

export default async function Posts() {
  const { data: posts } = await getPosts();

  return (
    <div className="flex-col max-w-[850px] w-full flex gap-6">
      {posts?.map((post) => {
        const content = JSON.parse(post.content);
        return (
          <>
            <PostCard
              key={randomBytes(10).toString("hex")}
              content={content}
              id={post.post_id}
            ></PostCard>
            <Divider orientation="horizontal" />
          </>
        );
      })}
    </div>
  );
}
