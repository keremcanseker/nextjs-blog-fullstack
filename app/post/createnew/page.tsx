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
import { use, useEffect, useState } from "react";
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

const CreateNewPostPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
    watch,
  } = useForm<createPost>({
    resolver: zodResolver(createPostSchema),
  });
  const watchedFields = watch();
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [authorname, setAuthorname] = useState("");

  const handlePostSubmit = async (data: createPost) => {
    const keywordsArray = data.keywords
      .split(" ")
      .filter((keyword) => keyword.trim() !== "");
    console.log(keywordsArray);
    const formData = {
      ...data,
      keywords: keywordsArray,
    };

    alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
  };

  const handleImageUpload = async () => {
    const fileInput = document.getElementById("upload") as HTMLInputElement;
    fileInput?.click();

    fileInput?.addEventListener("change", async (e) => {
      e.preventDefault();
      const files = fileInput.files;
      if (files) {
        const data = new FormData();
        data.append("file", files[0]);
        // data.append("title", imageTitle);

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
    });
  };

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const name = await getUserProfileName();
        setAuthorname(name);
      } catch (error) {
        console.error("Error fetching author name:", error);
      }
    };

    fetchAuthorName();
  }, []);
  // const createpostwrapperstyle = ``;
  // const createPostFormStyle = ``;
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
        <div className="flex w-full flex-col  justify-start">
          <Button
            size="lg"
            className="text-lg w-3 text-center justify-center  items-center mb-2"
            variant="ghost"
            color="primary"
            radius="md"
            spinner={
              <CircularProgress size="sm" color="primary" className="mr-2" />
            }
            spinnerPlacement="end"
            isLoading={imageLoading}
            onClick={() => {
              handleImageUpload();
            }}
          >
            <BsUpload className="" />
          </Button>
          <Input type="file" className="hidden" id="upload"></Input>
          {errors.image?.message && (
            <p className="text-red-500">{errors.image?.message}</p>
          )}
          {/* {imageUrl.length > 0 && <Image src={imageUrl} className="" />} */}
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
            colorsBackground: ["#f321f3"],
          }}
          // {...register("content", { required: true })}
        ></FroalaEditor>
        {errors.content?.message && (
          <p className="text-red-500">{errors.content?.message}</p>
        )}
        {/* </label> */}
        <Button type="submit" className="" color="primary" radius="sm">
          Submit
        </Button>
      </form>
      {/* preview of the live data */}

      <div className="flex flex-col gap-3 w-[40rem]">
        <h1 className="font-bold text-2xl text-left">Preview</h1>
        {imageUrl.length > 0 && <Image src={imageUrl} className="max-h-sm" />}
        <h1 className="font-semibold text-2xl ">{watchedFields.title}</h1>
        {watchedFields.title?.length > 0 && (
          <p className="text-left text-lg">
            {authorname && authorname}
            <span className="text-gray-500 text-base ml-1">
              {formatDate(new Date())}
            </span>
          </p>
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
export default CreateNewPostPage;
