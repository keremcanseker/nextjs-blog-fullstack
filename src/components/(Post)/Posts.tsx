import { getPosts } from "@/lib/actions/post";
import PostCard from "@/components/(Post)/PostCard";
import { CompletePostData } from "@/types/post";
export default async function Posts() {
  const posts = await getPosts();

  if ("error" in posts) {
    return <div>Error fetching posts: {posts.error}</div>;
  }

  if (!posts.length) {
    return <div>No posts found</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-5xl gap-6">
      {posts.map((post: CompletePostData) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
}
