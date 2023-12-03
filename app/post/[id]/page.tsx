import { getPost } from "@/app/lib/crud/post";
import { Image } from "@nextui-org/react";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost({ postId: params.id });
  // console.log(post);

  return (
    <section className="flex justify-center w-[60rem] mt-20">
      <div className="w-full flex flex-col justify-center gap-5">
        <h1 className="text-center uppercase font-bold text-3xl">
          {post.title}
        </h1>
        <Image src={post.image} className="w-full"></Image>
        <p>{post.category}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </section>
  );
}
