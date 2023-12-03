import { Textarea } from "@nextui-org/react";

interface SummaryProps {
  onChange: (value: string) => void;
  formData: string;
}

const Summary: React.FC<SummaryProps> = ({ onChange, formData }) => {
  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <section className="page_container justify-center items-center flex flex-col gap-6  w-screen">
      <h1 className="text-4xl">Summary</h1>
      <Textarea
        placeholder="Summuraize your post here"
        fullWidth
        className="text-xl  max-w-[28rem]"
        minRows={5}
        variant="faded"
        onChange={handleSummaryChange}
        value={formData}
        maxLength={268}
      ></Textarea>
    </section>
  );
};
export default Summary;
