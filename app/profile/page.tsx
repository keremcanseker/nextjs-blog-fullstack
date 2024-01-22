import { Link, Image } from "@nextui-org/react";
import { getUser, getUserPosts, getUserProfile } from "../lib/actions/user";
import { ZodType } from "zod";
import { z } from "zod";
import PostCard from "../components/(Post)/PostCard";
import { PostDataSchema, PostData } from "../types/page";

type ProfileData = {
  profile_pic?: string;
  username?: string;
  bio?: string;
  fullName?: string;
};

const UserData: ZodType<ProfileData> = z.object({
  profile_pic: z.string().optional(),
  username: z.string().optional(),
  bio: z.string().optional(),
  fullName: z.string().optional(),
});

export default async function Profile() {
  const data = await getUserProfile();
  const userData = UserData.parse(data);
  const data2 = await getUserPosts();
  const postData = PostDataSchema.parse(data2);

  const posts = postData.map((post) => ({
    title: post.title,
    summary: post.summary,
    content: post.content,
    category: post.category,
    image: post.image,
    post_id: post.post_id,
  }));

  return (
    <div
      className={`flex flex-col h-auto  justify-center items-center min-w-screen max-w-[54rem] gap-8 `}
    >
      <div className="flex justify-center flex-col gap-2  p-2">
        <h1 className="text-3xl font-bold">PROFILE</h1>
        <Link href="/profile/edit">Edit profile</Link>
      </div>
      <Image src={userData.profile_pic} width={300} height={300}></Image>
      <h1 className="text-2xl font-bold">{userData.fullName}</h1>
      <p>{userData.bio}</p>

      {posts.map((post) => (
        <PostCard
          content={post}
          id={post.post_id}
          key={post.post_id}
        ></PostCard>
      ))}
    </div>
  );
}
