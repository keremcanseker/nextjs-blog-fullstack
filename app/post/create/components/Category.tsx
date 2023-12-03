// Category.tsx
import { Checkbox } from "@nextui-org/react";
import React from "react";

interface CategoryProps {
  onChange: (selectedCategories: string[]) => void;
  formData: string[];
}

const Category: React.FC<CategoryProps> = ({ onChange, formData }) => {
  const handleCategoryChange = (category: string) => {
    if (formData.includes(category)) {
      // Deselect the category if it's already selected
      formData = formData.filter((c) => c !== category);
    } else {
      // Select the category if it's not selected
      formData = [...formData, category];
    }
    // Call the parent's onChange function with the updated selected categories
    onChange(formData);
  };

  const categories = [
    "Technology",
    "Programming",
    "Web Development",
    "test",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Blockchain",
    "Mobile App Development",
    "History",
    "Science",
    "Art",
    "Music",
    "Movies & TV",
  ];
  const width = window.innerWidth;

  return (
    <section className="page_container justify-center items-center flex-col gap-6">
      <h1 className="text-3xl">Choose categories</h1>

      <div className="md:grid md:grid-cols-3 gap-3 sm:component_outer">
        {categories.map((category) => (
          <div key={category}>
            <Checkbox
              value={category}
              onChange={() => handleCategoryChange(category)}
              className="gap-1 mb-1"
              isSelected={formData.includes(category) ? true : false}
              // Check if the category is in formData
            >
              {category}
            </Checkbox>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
