"use client";
import {
  Input,
  Button,
  Textarea,
  Image,
  CircularProgress,
  Chip,
} from "@nextui-org/react";
import { set, useForm } from "react-hook-form";
import { createPost, createPostSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImageLink } from "@/app/lib/actions/post";
import { BsUpload } from "react-icons/bs";
import { useRef, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/link.min.js";
import { formatDate } from "@/app/lib/actions/helpers";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { getUserProfileName } from "@/app/lib/actions/user";
import { postPost } from "@/app/lib/actions/post";
import { showToastError, showToastSuccess } from "@/app/components/Toaster";
import { useThemeStore } from "@/app/utils/ThemeStore";
import { getPost } from "@/app/lib/actions/post";
import { useSearchParams } from "next/navigation";
import { updatePost } from "@/app/lib/actions/post";

// Define the type for the data received from the query
type EditPostProps = {
  postId: string;
};

// Define the schema for the post data
type EditPostData = {
  title: string;
  keywords: string;
  summary: string;
  image: string;
  content: string;
};

const EditPostPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EditPostData>({
    resolver: zodResolver(createPostSchema),
  });
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const { theme } = useThemeStore();

  // Fetch post data based on postId

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
  });

  const watchedFields = watch();
  const [imageUrl, setImageUrl] = useState(watchedFields.image);
  const [imageLoading, setImageLoading] = useState(false);
  const [authorname, setAuthorname] = useState("");

  const handlePostSubmit = async (data: EditPostData) => {
    const keywordsArray = data.keywords
      .split(" ")
      .filter((keyword) => keyword.trim() !== "");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("image", data.image);
    formData.append("content", data.content);

    keywordsArray.forEach((keyword, index) => {
      formData.append(`keywords[${index}]`, keyword);
    });

    try {
      // Call the updatePost function instead of postPost
      const response = await updatePost({
        postId: postId || "",
        data: formData,
      });
      if (response.success) {
        showToastSuccess({
          message: "Post updated successfully",
          theme: theme,
        });
      }
      if (response.error) {
        showToastError({ message: response.error, theme: theme });
      }
    } catch (error) {
      showToastError({ message: "Error updating post", theme: theme });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPost({ postId: postId || "" });
        console.log("Post Data:", postData);
        // Preload the form with the fetched data
        setAuthorname(postData.author);
        setValue("title", postData.title);
        setValue("keywords", postData.keywords.join(" "));
        setValue("summary", postData.summary);
        setValue("image", postData.image);
        setValue("content", postData.content);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      className={`flex justify-between min-w-screen p-[3rem] gap-[120px]`}
    >
      <form
        onSubmit={handleSubmit(handlePostSubmit)}
        className={`flex flex-col gap-5 w-[35rem]`}
      >
        <h1 className="font-bold text-2xl">Fill your post</h1>

        <p className="text-xl">Upload a cover image</p>
        <div className="flex w-full flex-col justify-start">
          <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-md ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-lg">
              {imageLoading ? (
                <CircularProgress size="sm" color="primary" />
              ) : (
                <p className="text-lg">
                  Drop or click to upload an image
                  <BsUpload size="1.5rem" className="inline-block ml-2" />
                </p>
              )}
            </p>
          </div>
          {errors.image?.message && (
            <p className="text-red-500">{errors.image?.message}</p>
          )}
        </div>
        <Input
          {...register("title", { required: true })}
          value={watchedFields.title}
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
          value={watchedFields.keywords}
          variant="faded"
          radius="sm"
          size="lg"
          label="Keywords related to your post "
          placeholder="Put a space between each keyword"
          labelPlacement="outside"
          className=""
        ></Input>
        <Textarea
          label="Summurize the content of your post(this will not be shown in the post)"
          labelPlacement="outside"
          value={watchedFields.summary}
          variant="faded"
          radius="sm"
          maxLength={150}
          {...register("summary", { required: true })}
          errorMessage={errors.summary?.message}
        ></Textarea>

        <FroalaEditor
          tag="textarea"
          model={watchedFields.content}
          onModelChange={(value: any) => {
            console.log("FroalaEditor Value:", value);
            setValue("content", value);
          }}
          config={{
            placeholderText: "Edit Your Content Here!",
            imageUpload: false,
          }}
          // {...register("content", { required: true })}
        ></FroalaEditor>
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

      <div className="flex flex-col gap-3 w-[40rem]">
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
        {watchedFields.image && (
          <Image src={watchedFields.image} className="max-h-sm" />
        )}
        {/* map through key words */}
        <div className="flex flex-wrap gap-2">
          {watchedFields.keywords?.length > 0 &&
            watchedFields.keywords.split(" ").map((keyword, index) => (
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
        <FroalaEditorView
          model={watchedFields.content}
          config={{
            placeholderText: "Edit Your Content Here!",
            // backgroundColor: "#000",
          }}
        ></FroalaEditorView>
      </div>
    </section>
  );
};

export default EditPostPage;
