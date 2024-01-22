"use server";
import { getUserSession } from "./lib/auth/page";
import Home from "./components/(Root)/Home";
import Welcome from "./components/(Root)/Welcome";

const Page: React.FC = async () => {
  const { data } = await getUserSession();

  return <>{data.session ? <Home /> : <Welcome />}</>;
};

export default Page;
