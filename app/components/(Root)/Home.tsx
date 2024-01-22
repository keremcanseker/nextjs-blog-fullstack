import Navbar from "../Navbar";

import "@/app/styles/globals.css";
import Posts from "../(Post)/Posts";
const Home: React.FC = () => {
  return (
    <section className="home_test">
      <Navbar />
      <Posts />
    </section>
  );
};
export default Home;
