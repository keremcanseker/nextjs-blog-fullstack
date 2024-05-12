import { checkForSession } from "@/lib/auth/auth";
import Home from "@/components/(Root)/Home";
import Welcome from "@/components/(Root)/Welcome";

const Page: React.FC = async () => {
  const session = await checkForSession();
  const Component = session ? <Home /> : <Welcome />;
  return <>{Component}</>;
};

export default Page;
