import { getPosts } from "@/app/lib/actions/post";
import PostCard from "./PostCard";
import Link from "next/link";
import { randomBytes } from "crypto";
import { Divider } from "@nextui-org/react";

export default async function Posts() {
  const posts = (await getPosts()) as any[];

  return (
    <div className="flex-col w-full  max-w-5xl flex gap-6">
      {posts?.map((post: any, index) => {
        return (
          <div key={index}>
            <PostCard
              key={randomBytes(10).toString("hex")}
              content={post.content}
              createdAt={post.created_at}
              image={post.image}
              keywords={post.keywords}
              summary={post.summary}
              title={post.title}
              id={post.post_id}
            ></PostCard>
          </div>
        );
      })}
    </div>
  );
}
