import { getPosts } from "@/lib/actions/post";
import { randomBytes } from "crypto";
import PostCard from "@/components/(Post)/PostCard";
import { Post } from "@/types/post";

export default async function Posts() {
  const posts = (await getPosts()) as Post[] | null;
  if (!posts) {
    return <div>No posts found</div>;
  }
  return (
    <div className="flex-col w-full  max-w-5xl flex gap-6">
      {posts &&
        posts.map((post: any, index) => {
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
