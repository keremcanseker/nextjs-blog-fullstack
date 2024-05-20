import ArrowBack from "@/components/ArrowBack";
import SigninForm from "@/app/auth/components/SigninForm";
const Signin: React.FC = () => {
  return (
    <section className="form_wrapper items-center ">
      <div className="border flex flex-col dark:border-gray-800 light:border-gray-300 bg-[var(--primary)] p-6   sm:min-w-[35rem]  rounded-xl ">
        <ArrowBack label="Back" className="mb" />
        <SigninForm />
      </div>
    </section>
  );
};
export default Signin;
