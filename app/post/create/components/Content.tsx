import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ContentEditorProps {
  onChange: (value: string) => void;
  formData: string;
}

const modules = {
  toolbar: [
    [
      { header: [1, 2, 3, false] },
      { font: ["Space Grotesk", "Work Sans"] as string[] },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] as string[] }, { background: [] as string[] }],
    ["link", "code-block"],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] as string[] }],
    ["clean"],
  ],
};

const ContentEditor: React.FC<ContentEditorProps> = ({
  onChange,
  formData,
}) => {
  const [content, setContent] = useState(formData);

  const handleContentChange = (value: string) => {
    setContent(value);
    onChange(value);
  };

  return (
    <section className="page_container w-screen justify-center items-center flex-col gap-6">
      <h1 className="text-4xl">Content Editor</h1>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        className="max-w-[70rem] h-full max-h-[40rem]"
        modules={modules}
      />
    </section>
  );
};

export default ContentEditor;
