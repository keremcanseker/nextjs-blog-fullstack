
import { getPost } from "@/app/lib/actions/post";
import { Divider, Image } from "@nextui-org/react";
import Comments from "@/app/components/Comments/Comments";
import Navbar from "@/app/components/Navbar";
const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost({ postId: params.id });
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const theme = "light";

  // console.log(post);

  return (
    <section
      className={`h-auto  min-h-screen flex flex-col justify-center max-w-5xl px-4  mt-20`}
    >
      

      <div className="w-full flex flex-col justify-center gap-5">
        {/* <CustomSpinner></CustomSpinner> */}
        <h1 className="text-left uppercase font-bold text-3xl">
          {post.title}
        </h1>
        <p className="text-left text-lg">{post.author} <span className="text-gray-500 text-base">{formattedDate}</span></p>
     
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
