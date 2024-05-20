import Posts from "@/components/(Post)/Posts";
import CustomNav from "@/components/CustomNav";
const Home: React.FC = () => {
  return (
    <section className="home_test">
      <CustomNav className="mb-4" />
      <Posts />
    </section>
  );
};
export default Home;
