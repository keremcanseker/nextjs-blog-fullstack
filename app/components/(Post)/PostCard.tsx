import { Image } from "@nextui-org/react";
import Link from "next/link";

interface PostCardProps {
  content: {
    title: string;
    summary: string;
    content: string;
    category: string[];
    image: string;
  };
  id: string;
}

export default function PostCard({
  content: { title, summary, content, category, image },
  id,
}: PostCardProps) {
  const imageUrl = image.toLowerCase();
  //light:border-slate-950 dark:border-x-slate-50 rounded-lg border

  return (
    <Link
      href={{
        pathname: `/post/${id}`,
      }}
      content={content}
    >
      <div className="p-2  sm:flex-row flex flex-col gap-10">
        <div className="">
          <Image src={imageUrl} width={400}></Image>
        </div>
        <div className="flex flex-col  w-[450px]">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="font-semibold">{category}</p>
          <p>{summary}</p>
        </div>
      </div>
    </Link>
  );
}
