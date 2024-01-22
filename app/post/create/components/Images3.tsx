import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { BsUpload } from "react-icons/bs";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { getImageLink } from "@/app/lib/actions/post";
interface UploadImageProps {
  onChange: (value: Object) => void;
  formData: string;
  imageTitle: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  formData,
  imageTitle,
}) => {
  const [imageUrl, setImageUrl] = useState(formData);
  const [localImage, setLocalImage] = useState("");

  // const handleImageUpload = () => {
  //   console.log("clicked");
  //   const id = document.getElementById("upload");
  //   id?.click();
  //   id?.addEventListener("change", async (e) => {
  //     console.log("clicked");
  //     const files = (e.target as HTMLInputElement).files;
  //     if (files) {

  //       const data = new FormData();
  //       data.append("file", files[0]);
  //       data.append("title", imageTitle);
  //       const response = await getImageLink({ formData: data });
  //       console.log(response);

  //     }
  //   });
  // };
  const handleImageUpload = async () => {
    const fileInput = document.getElementById("upload") as HTMLInputElement;
    fileInput?.click();

    fileInput?.addEventListener("change", async (e) => {
      e.preventDefault();
      const files = fileInput.files;
      if (files) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("title", imageTitle);

        try {
          const response = await getImageLink({ formData: data });
          setImageUrl(response.url);
          onChange(response.url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    });
  };
  return (
    <section className="page_container justify-center items-center flex-col gap-6 w-screen">
      <h1 className="text-4xl text-center">Upload image</h1>
      <div className="flex flex-col items-center max-w-full ">
        <Button
          size="lg"
          className="text-xl w-[14rem] text-center justify-center  items-center"
          variant="ghost"
          color="primary"
          onClick={() => {
            handleImageUpload();
          }}
        >
          <BsUpload className="mr-1" />
        </Button>
        <Input type="file" className="hidden" id="upload"></Input>
        {/* </label> */}
        {imageUrl.length > 0 && (
          <Image src={imageUrl} className="w-[400px] h-[400px]" />
        )}
      </div>
      {/* <label className="text-center items-center flex flex-col justify-center"> */}
    </section>
  );
};
export default UploadImage;
