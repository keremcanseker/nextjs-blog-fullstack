import { useEffect, useState } from "react";
import { getUserProfileName } from "@/lib/utils/server-actions/user";
export default function useAuthorName() {
  const [authorname, setAuthorname] = useState("");
  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const name = await getUserProfileName();
        setAuthorname(name);
      } catch (error) {
        console.error("Error fetching author name:", error);
      }
    };

    fetchAuthorName();
  }, []);

  return { authorname };
}
