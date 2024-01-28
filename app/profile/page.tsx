import { Link, Image, Divider } from "@nextui-org/react";
import { getUser, getUserPosts, getUserProfile } from "../lib/actions/user";
import { ZodType } from "zod";
import { z } from "zod";
import PostCard from "../components/(Post)/PostCard";
import { PostDataSchema, PostData } from "../types/post";
import CustomNav from "../components/CustomNav";

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

  const posts = data2.map((post) => ({
    title: post.title,
    summary: post.summary,
    content: post.content,
    keywords: post.keywords,
    image: post.image,
    post_id: post.post_id,
    created_at: post.created_at,
  }));

  return (
    <section className="flex flex-col">
      <CustomNav></CustomNav>
      <div
        className={`flex flex-col md:flex-row h-auto   justify-center  min-w-screen max-w-5xl  px-4 gap-8 `}
      >
        <div className="flex flex-col gap-2 ">
          {/* <div className="flex justify-center flex-col gap-2  p-2">
            <h1 className="text-3xl font-bold">PROFILE</h1>
           
          </div> */}
          {userData && (
            <>
              <Image
                src={userData.profile_pic}
                className="self-center"
                width={300}
                alt="hello"
                height={300}
              ></Image>
              <h1 className="text-2xl font-bold">{userData.fullName}</h1>
              <Link href="/profile/edit">Edit profile</Link>
              <p>{userData.bio}</p>
            </>
          )}
        </div>
        {/* <div>
          <Divider orientation="verti" className="mx-2 " />
        </div> */}

        <div className="flex flex-col gap-2  ">
          {posts.map((post) => (
            <PostCard
              title={post.title}
              summary={post.summary}
              content={post.content}
              keywords={post.keywords}
              image={post.image}
              id={post.post_id}
              key={post.post_id}
              createdAt={post.created_at}
            ></PostCard>
          ))}
        </div>
      </div>
    </section>
  );
}
