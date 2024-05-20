import { ArrowHome } from "@/components/ArrowBack";
import SignupForm from "../components/SignupForm";
const Register: React.FC = () => {
  return (
    <section className="form_wrapper items-center">
      <div className="border flex flex-col dark:border-gray-800 light:border-gray-300  bg-[var(--primary)] p-6 w-full rounded-xl">
        <ArrowHome />
        <SignupForm />
      </div>
    </section>
  );
};

export default Register;
