// import Navbar from "../Navbar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import "@/app/styles/globals.css";
import Posts from "../(Post)/Posts";
import CustomNav from "../CustomNav";
const Home: React.FC = () => {
  return (
    <section className="home_test ">
      <CustomNav className="mb-4" />
      {/* <Navbar /> */}
      <Posts />
    </section>
  );
};
export default Home;
