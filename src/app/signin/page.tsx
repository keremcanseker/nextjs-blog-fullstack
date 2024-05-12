"use client";

import Register from "./components/Register";
import Login from "./components/Login";
import { useThemeStore } from "@/app/utils/ThemeStore";
import "./style.css";

import { useLogInStore } from "@/app/utils/LogInStore";
const Signin: React.FC = () => {
  const { register } = useLogInStore();
  const { theme } = useThemeStore();

  return (
    <section className={`main_wrapper ${theme}`}>
      {register ? <Register /> : <Login />}
    </section>
  );
};

export default Signin;
