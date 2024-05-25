"use client";
import {
  Input,
  Button,
  Textarea,
  Image,
  CircularProgress,
  Chip,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageLink } from "@/lib/utils/server-actions/post";
import { Upload } from "@/components/Icons";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { textEditorOptions } from "@/lib/config/options";
import { createPost } from "@/lib/utils/server-actions/post";
import { formatDate } from "@/lib/utils/helpers";
import { showToastError, showToastSuccess } from "@/components/Toaster";
import "react-quill/dist/quill.snow.css";
import { PostContent, PostContentSchema } from "@/types/post";
import { useTheme } from "next-themes";
import { Theme } from "@/types/theme";
import useAuthorName from "@/lib/hooks/useAuthorName";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PostContent>({
    resolver: zodResolver(PostContentSchema),
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const { theme } = useTheme();
  const { authorname } = useAuthorName();
  const router = useRouter();
  const watchedFields = watch();
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const data = new FormData();
      data.append("file", acceptedFiles[0]);

      try {
        setImageLoading(true);
        const response = await getImageLink({ formData: data });
        setImageUrl(response.url);
        setValue("image", response.url);
        setImageLoading(false);
      } catch (error) {
        setImageLoading(false);
        console.error("Error uploading image:", error);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxSize: 5242880,
  });

  const handlePostSubmit = async (data: PostContent) => {
    try {
      const response = await createPost({ data });
      if (!response.success) {
        showToastError({
          message: "Error creating post",
          theme: theme as Theme,
        });
        return;
      }
      showToastSuccess({
        message: "Post created successfully",
        theme: theme as Theme,
      });
      router.push(`/profile`);
    } catch (error) {
      showToastError({ message: "Error creating post", theme: theme as Theme });
      console.error("Error creating post:", error);
    }
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordsString = e.target.value;
    const keywordsArray = keywordsString
      .split(" ")
      .filter((keyword) => keyword.trim() !== "");
    setValue("keywords", keywordsArray);
  };

  return (
    <section
      className={`flex flex-col xl:flex-row justify-between min-w-screen p-4 md:p-[3rem] gap-[120px]`}
    >
      <form
        onSubmit={handleSubmit(handlePostSubmit)}
        className={`flex flex-col gap-5 w-full md:w-[35rem]`}
      >
        <h1 className="font-bold text-2xl">Create your post</h1>

        <p className="text-xl">Upload a cover image</p>
        <div className="flex w-full flex-col justify-start">
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-md ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />

            {imageLoading ? (
              <CircularProgress size="sm" color="primary" />
            ) : (
              <p className="text-lg">
                Drop or click to upload an image
                <Upload size="1.5rem" className="inline-block ml-2" />
              </p>
            )}
          </div>
          {errors.image?.message && (
            <p className="text-red-500">{errors.image?.message}</p>
          )}
        </div>
        <Input
          {...register("title", { required: true })}
          errorMessage={errors.title?.message}
          variant="faded"
          radius="sm"
          size="lg"
          label="Title for your post"
          placeholder="Please enter a title"
          labelPlacement="outside"
        ></Input>
        <Input
          {...register("keywords", { required: true })}
          errorMessage={errors.keywords?.message}
          variant="faded"
          radius="sm"
          size="lg"
          label="Keywords related to your post "
          placeholder="Put a space between each keyword"
          labelPlacement="outside"
          className=""
          onChange={handleKeywordsChange}
        ></Input>
        <Textarea
          label="Summurize the content of your post(this will not be shown in the post)"
          labelPlacement="outside"
          variant="faded"
          radius="sm"
          maxLength={150}
          {...register("summary", { required: true })}
          errorMessage={errors.summary?.message}
        ></Textarea>

        <ReactQuill
          theme="snow"
          value={watchedFields.content || ""}
          onChange={(value) => setValue("content", value)}
          className="h-[30rem] overflow-y-auto"
          placeholder="Write your content here"
          modules={textEditorOptions}
        ></ReactQuill>

        {errors.content?.message && (
          <p className="text-red-500">{errors.content?.message}</p>
        )}
        {/* </label> */}
        <Button
          type="submit"
          className=""
          color="primary"
          radius="sm"
          spinner={<CircularProgress size="sm" color="primary" />}
          spinnerPlacement="end"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
      {/* preview of the live data */}

      <div className="flex flex-col gap-3 w-full md:w-[40rem]">
        <h1 className="font-bold text-2xl text-left">Preview</h1>

        <h1 className="font-semibold text-2xl ">{watchedFields.title}</h1>
        {watchedFields.title?.length > 0 && (
          <p className="text-left text-lg">
            {authorname && authorname}
            <span className="text-gray-500 text-base ml-1">
              {formatDate(new Date())}
            </span>
          </p>
        )}
        {imageUrl.length > 0 && (
          <Image src={imageUrl} className="max-h-sm" alt="hello" />
        )}
        {/* map through key words */}
        <div className="flex flex-wrap gap-2">
          {watchedFields.keywords &&
            Array.isArray(watchedFields.keywords) &&
            watchedFields.keywords.map((keyword, index) => (
              <Chip
                key={index}
                color="secondary"
                className="text-black dark:text-white"
              >
                {keyword}
              </Chip>
            ))}
        </div>
        <p> {watchedFields.summary}</p>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: watchedFields.content || "" }}
        ></div>
      </div>
    </section>
  );
}
