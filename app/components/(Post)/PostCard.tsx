import { Image, Chip } from "@nextui-org/react";
import Link from "next/link";
import { format } from "date-fns";

interface PostCardProps {
  content: string;
  title: string;
  summary: string;
  image: string;
  id: string;
  createdAt: string;
  keywords: string[];
}
const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PostCard({
  content,
  title,
  summary,
  image,
  id,
  createdAt,
  keywords,
}: PostCardProps) {
  // const imageUrl = image.toLowerCase();

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  return (
    <Link
      href={{
        pathname: `/post/${id}`,
      }}
      content={content}
    >
      <div className="p-2  sm:flex-row flex flex-col gap-10 border-2 rounded-md border-solid light:border-gray-400 dark:border-gray-600">
        <div className="">
          <Image src={image} width={400}></Image>
        </div>

        <div className="flex flex-col w-full gap-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm">{formattedDate}</p>
          <div className="flex flex-wrap gap-1">
            {keywords &&
              keywords.map((keyword) => (
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
