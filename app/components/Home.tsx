import Navbar from "./Navbar";

import "@/app/styles/globals.css";
import Posts from "./(Post)/Posts";
const Home: React.FC = () => {
  return (
    <section className="home_wrapper min-h-screen flex-col">
      <Navbar />
      <Posts />
    </section>
  );
};
export default Home;
