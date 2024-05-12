import { getPosts } from "@/lib/actions/post";
import PostCard from "./PostCard";
import { randomBytes } from "crypto";

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
