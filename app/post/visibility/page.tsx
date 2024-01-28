import Visibility from "./visibility";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Visibility />
    </Suspense>
  );
}
