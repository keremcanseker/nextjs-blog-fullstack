import { Image, Chip } from "@nextui-org/react";
import { CompletePostData } from "@/types/post";
import { formatDate } from "@/lib/actions/helpers";
import Link from "next/link";

interface PostCardProps {
  post: CompletePostData;
}

export default function PostCard({ post }: PostCardProps) {
  const { title, summary, image, content, post_id, created_at, keywords } =
    post;
  const formattedDate = formatDate(new Date(created_at));
  return (
    <Link href={`/post/${post_id}`}>
      <div className="p-2 sm:flex-row flex flex-col gap-10 border-2 rounded-md border-solid light:border-gray-400 dark:border-gray-600">
        <div>
          <Image src={image} width={400} alt={title} />
        </div>
        <div className="flex flex-col w-full gap-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm">{formattedDate}</p>
          <div className="flex flex-wrap gap-1">
            {keywords.map((keyword) => (
              <Chip color="default" size="sm" key={keyword}>
                {keyword}
              </Chip>
            ))}
          </div>
          <p>{summary}</p>
        </div>
      </div>
    </Link>
  );
}
