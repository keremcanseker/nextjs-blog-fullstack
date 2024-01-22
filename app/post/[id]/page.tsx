import { getPost } from "@/app/lib/actions/post";
import { Divider, Image } from "@nextui-org/react";
import Comments from "@/app/components/Comments/Comments";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost({ postId: params.id });
  const theme = "light";

  // console.log(post);

  return (
    <section
      className={`${theme} h-auto  min-h-screen flex justify-center max-w-5xl px-4  mt-20`}
    >
      <div className="w-full flex flex-col justify-center gap-5">
        {/* <CustomSpinner></CustomSpinner> */}
        <h1 className="text-center uppercase font-bold text-3xl">
          {post.title}
        </h1>
        <Image src={post.image} className="w-full"></Image>
        <p>{post.category}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <div className="flex flex-col">
          <Divider orientation="horizontal" className="my-6"></Divider>
          {<Comments id={params.id}></Comments>}
        </div>
      </div>
    </section>
  );
}
