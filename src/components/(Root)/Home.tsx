import "@/app/styles/globals.css";
import Posts from "../(Post)/Posts";
import CustomNav from "../CustomNav";
const Home: React.FC = () => {
  return (
    <section className="home_test ">
      <CustomNav className="mb-4" />

      <Posts />
    </section>
  );
};
export default Home;
