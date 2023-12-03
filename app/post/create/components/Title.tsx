import { Input } from "@nextui-org/react";

interface TitleProps {
  onChange: (value: string) => void;
  formData: string;
}

const Title: React.FC<TitleProps> = ({ onChange, formData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <section className="page_container  justify-center items-center flex-col gap-6">
      <h1 className="text-4xl">What is the title of your post?</h1>
      <Input
        width="100%"
        height="4xl"
        size="lg"
        placeholder="Title"
        variant="faded"
        radius="lg"
        value={formData}
        onChange={handleInputChange}
      />
    </section>
  );
};
export default Title;
