import { getUserSession } from "./lib/auth/auth";
import Home from "./components/(Root)/Home";
import Welcome from "./components/(Root)/Welcome";

const Page: React.FC = async () => {
  const { data } = await getUserSession();
  const Component = data.session ? <Home /> : <Welcome />;
  return <>{Component}</>;
};

export default Page;
