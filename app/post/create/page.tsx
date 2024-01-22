"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@nextui-org/react";
import { createPost, getPost } from "@/app/lib/actions/post";
import Link from "next/link";
import Title from "./components/Title";
import Category from "./components/Category";
import UploadImage from "./components/Images3";
import Summary from "./components/Summary";
import ContentEditor from "./components/Content";
import { useRouter } from "next/navigation";

const CreatePost: React.FC = () => {
  const [step, setStep] = useState(0); // Manage the current step
  const [formData, setFormData] = useState({
    category: [] as string[],
    content: "",
    summary: "",
    title: "",
    imageUrl: "",
  }); // Store form data
  const router = useRouter();

  const handleNextStep = () => {
    // Validate and process data for each step if needed
    if (step === 0 && !formData.title) {
      // Handle validation for Step 1
      alert("Please write your title.");
      return;
    }

    if (step === 20 && !formData.category.length) {
      // Handle validation for Step 2 (file upload)
      alert("Please choose at least one category.");
      return;
    }

    if (step === 40 && !formData.imageUrl) {
      // Handle validation for Step 3
      alert("Please upload an image.");

      return;
    }

    if (step === 60 && !formData.summary) {
      alert("Please enter a summary.");
      return;
    }
    // Proceed to the next step
    if (step === 60) {
      setStep(100);
      return;
    }
    setStep(step + 20);
  };

  const handleBackStep = () => {
    // Go back to the previous step
    setStep(step - 20);
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
  };
  const handleCategoryChange = (selectedCategory: string[]) => {
    setFormData({
      ...formData,
      category: selectedCategory,
    });
  };
  const handleSummaryChange = (summary: string) => {
    setFormData({ ...formData, summary });
  };

  const handleImageChange = (image: any) => {
    setFormData({
      ...formData,
      imageUrl: image,
    });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async () => {
    // const post = await getPost({ postId: "kerem" });
    // console.log(post);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("summary", formData.summary);
    data.append("content", formData.content);
    data.append("category", formData.category.join(","));
    data.append("image", formData.imageUrl);
    try {
      const result = await createPost({ data: data });
      router.push(`/`);
      // console.log(result);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    // Update formData when the user state changes
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  }, []);

  return (
    <section className="create_post_wrapper ">
      <div className="h-screen w-full flex flex-col p-5 justify-between items-center max-w-[80rem]">
        <Link href="/">
          <h1 className="text-4xl text-center">Enlighten Us</h1>
        </Link>

        {/* Render different form components based on the current step */}
        {step === 0 && (
          <Title onChange={handleTitleChange} formData={formData.title} />
        )}
        {step === 20 && (
          <Category
            onChange={handleCategoryChange}
            formData={formData.category}
          />
        )}
        {step === 40 && (
          <UploadImage
            onChange={handleImageChange}
            imageTitle={formData.title}
            formData={formData.imageUrl}
          />
        )}
        {step === 60 && (
          <Summary onChange={handleSummaryChange} formData={formData.summary} />
        )}

        {step === 100 && (
          <ContentEditor
            onChange={handleContentChange}
            formData={formData.content}
          />
        )}

        {/* Progress bar */}
        <div className="w-full max-w-[30rem] p-2">
          <Progress
            aria-label="Progress"
            size="md"
            value={step} // Assuming 4 steps
            color="primary"
            showValueLabel={true}
            className=" mb-2"
          />
          <div className="flex flex-row gap-5 justify-between">
            {/* Navigation buttons */}
            {step > 1 && (
              <button onClick={handleBackStep} className="btn">
                Back
              </button>
            )}
            {step < 100 ? (
              <button onClick={handleNextStep} className="btn">
                Next
              </button>
            ) : (
              <button className="btn pr-8" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
