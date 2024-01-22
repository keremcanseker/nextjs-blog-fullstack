import { getPosts } from "@/app/lib/actions/post";
import PostCard from "./PostCard";
import Link from "next/link";
import { randomBytes } from "crypto";
import { Divider } from "@nextui-org/react";

export default async function Posts() {
  const { data: posts } = await getPosts();

  return (
    <div className="flex-col w-full  max-w-[52rem] flex gap-6">
      {posts?.map((post, index) => {
        const content = JSON.parse(post.content);
        return (
          <div key={index}>
            <PostCard
              key={randomBytes(10).toString("hex")}
              content={content}
              id={post.post_id}
            ></PostCard>
            <Divider orientation="horizontal" />
          </div>
        );
      })}
    </div>
  );
}
