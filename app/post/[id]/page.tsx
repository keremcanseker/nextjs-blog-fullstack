import { getPost } from "@/app/lib/actions/post";
import { Divider, Image, Chip } from "@nextui-org/react";
import Comments from "@/app/components/Comments/Comments";
import Navbar from "@/app/components/Navbar";
import CustomNav from "@/app/components/CustomNav";
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

  console.log(post);

  return (
    <div className="flex flex-col">
      <CustomNav />
      <section
        className={`h-auto  min-h-screen flex flex-col justify-center max-w-5xl px-4  mt-8`}
      >
        <div className="w-full flex flex-col justify-center gap-5">
          {/* <CustomSpinner></CustomSpinner> */}
          <h1 className="text-left uppercase font-bold text-3xl">
            {post.title}
          </h1>
          <p className="text-left text-lg">
            {post.author}{" "}
            <span className="text-gray-500 text-base">{formattedDate}</span>
          </p>
          <Divider orientation="horizontal"></Divider>

          <Image src={post.image} className="w-full"></Image>
          <div className="flex flex-wrap gap-2">
            <p className="text-left text-lg">Keywords:</p>
            {post.keywords &&
              post.keywords.map((keyword: any) => (
                <Chip key={keyword} color="primary" className="" variant="flat">
                  {keyword}
                </Chip>
              ))}
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          <div className="flex flex-col">
            <Divider orientation="horizontal" className="my-6"></Divider>
            {<Comments id={params.id}></Comments>}
          </div>
        </div>
      </section>
    </div>
  );
}
