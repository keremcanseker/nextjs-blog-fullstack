"use client";
import { Button, CircularProgress, Image, Input } from "@nextui-org/react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUser } from "@/app/lib/actions/user";
import { UserFormData } from "./types";
import { schema } from "./types";
import CustomNav from "@/app/components/CustomNav";
import { getImageLinkforProfile } from "@/app/lib/actions/post";
import { showToastError, showToastSuccess } from "@/app/components/Toaster";
import { useThemeStore } from "@/app/utils/ThemeStore";
export default function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  }); //burdaki handle submit sunu yapiyor once validatini yapiyor sonra submiti yapiyor gecmesse submiti yapmiyor
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const imageLink = await getImageLinkforProfile({ formData });
        console.log(imageLink);

        if (imageLink.success) {
          // Use setValue to update the image field in the form data
          setValue("image", imageLink.url);
          setUploadedImage(imageLink.url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const submitForm = async (data: UserFormData) => {
    console.log("submitted");

    // If the image field is not empty, send a request to getImageLink

    // Now, you can directly pass the data object to updateUser
    const result = await updateUser(data);
    if (result.error) {
      showToastError({ message: result.error, theme: theme });
    } else {
      showToastSuccess({
        message: "Successfully updated profile",
        theme: theme,
      });
    }
  };

  return (
    <section className="flex h-screen flex-col w-screen items-center ">
      <CustomNav className="" />
      <div className="flex flex-col items-center mt-20 min-w-screen max-w-5xl px-4 gap-8">
        {uploadedImage && (
          <Image
            src={uploadedImage}
            width={200}
            height={200}
            radius="sm"
            alt="hello"
          />
        )}
        <label htmlFor="image" className="hover:cursor-pointer">
          Upload Image
        </label>
        {errors.image?.message}
        <input
          id="image"
          type="file"
          className="hidden"
          onChange={handleImage}
        />
        <form
          className="flex flex-col  max-w-[300px] gap-1"
          onSubmit={handleSubmit(submitForm)}
        >
          <Input
            {...(register("fullName"), { required: true })}
            size="md"
            radius="sm"
            type="text"
            label="Name:"
            labelPlacement="outside"
            errorMessage={errors.fullName?.message}
          ></Input>

          <Input
            {...(register("bio"), { required: true })}
            size="md"
            radius="sm"
            type="text"
            label="Bio:"
            labelPlacement="outside"
            errorMessage={errors.bio?.message}
          ></Input>

          <Input
            {...(register("username"), { required: true })}
            size="md"
            radius="sm"
            type="text"
            label="Username"
            labelPlacement="outside"
            errorMessage={errors.username?.message}
          ></Input>

          <Button
            type="submit"
            radius="sm"
            size="md"
            color="primary"
            className="mt-4"
            spinner={<CircularProgress className="" />}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
