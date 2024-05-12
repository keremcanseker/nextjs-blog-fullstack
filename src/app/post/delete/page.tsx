import Delete from "./delete";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Delete />
    </Suspense>
  );
}
