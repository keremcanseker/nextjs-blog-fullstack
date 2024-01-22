import { Spinner } from "@nextui-org/react";
export default function Loader() {
  return (
    <div className="flex justify-end items-center mx-auto my-4">
      <Spinner size="lg" />
    </div>
  );
}
