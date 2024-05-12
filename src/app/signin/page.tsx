"use client";

import Register from "./components/Register";
import Login from "./components/Login";
import { useTheme } from "@/lib/hooks/useTheme";
import "./style.css";

import { useLogin } from "@/lib/hooks/useLogin";
const Signin: React.FC = () => {
  const { register } = useLogin();
  const { theme } = useTheme();

  return (
    <section className={`main_wrapper ${theme}`}>
      {register ? <Register /> : <Login />}
    </section>
  );
};

export default Signin;
