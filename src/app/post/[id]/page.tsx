import { Divider, Image, Chip, Button } from "@nextui-org/react";
import { Edit, Visibility, Delete } from "@/components/Icons";
import CustomNav from "@/components/CustomNav";
import Link from "next/link";
import { getPost } from "@/lib/actions/post";
import { checkIfPostBelongsToCurrentUser } from "@/lib/auth/auth";
import DOMPurify from "isomorphic-dompurify";

export default async function PostPage({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const postData = await getPost({ postId: params.id });
  if (!postData) return null;
  const isPostOwner = await checkIfPostBelongsToCurrentUser(postData.post_id);
  return (
    <div className="flex flex-col">
      <CustomNav />
      <section
        className={`h-auto  min-h-screen flex flex-col justify-center max-w-5xl px-4  mt-8`}
      >
        <div className="w-full flex flex-col justify-center gap-5">
          <div className="flex sm:justify-between flex-wrap gap-2">
            <h1 className="text-left uppercase font-bold text-3xl">
              {postData.title}
            </h1>
            {isPostOwner && (
              <div className="flex gap-1">
                <Button
                  isIconOnly
                  color="primary"
                  className="text-xl"
                  variant="faded"
                >
                  <Link href={`/post/edit?id=${params.id}`}>
                    <Edit></Edit>
                  </Link>
                </Button>
                <Button
                  isIconOnly
                  color="primary"
                  className="text-xl"
                  variant="faded"
                >
                  <Link href={`/post/visibility?id=${params.id}`}>
                    <Visibility></Visibility>
                  </Link>
                </Button>
                <Button
                  isIconOnly
                  color="danger"
                  className="text-xl"
                  variant="faded"
                >
                  <Link href={`/post/delete?id=${params.id}`}>
                    <Delete></Delete>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <p className="text-left text-lg">
            {postData.author}{" "}
            <span className="text-gray-500 text-base">
              {postData.created_at}
            </span>
          </p>
          <Divider orientation="horizontal"></Divider>

          <Image src={postData.image} className="w-full" alt="hello"></Image>
          <div className="flex flex-wrap gap-2">
            <p className="text-left text-lg">Keywords:</p>
            {postData.keywords.length > 0 &&
              postData.keywords.map((keyword: any) => (
                <Chip key={keyword} color="default" className="" variant="flat">
                  {keyword}
                </Chip>
              ))}
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postData.content),
            }}
          ></div>
          {/* render comments 
          <div className="flex flex-col">
            
            <Divider orientation="horizontal" className="my-6"></Divider>
            {<Comments id={params.id}></Comments>}
          </div> */}
        </div>
      </section>
    </div>
  );
}
