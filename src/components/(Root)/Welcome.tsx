import { Image, Button, Link } from "@nextui-org/react";

const Welcome: React.FC = () => {
  return (
    <section className="gap-10 page_wrapper items-center">
      <Image
        src="/image.png"
        width={300}
        height={300}
        className=" shadow-2xl"
        alt="hello"
      ></Image>

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl  text-center">Welcome to the G Blog</h1>

        <Link href="/auth/sign-up" className="w-full ">
          <Button
            className="w-full text-lg"
            color="primary"
            radius="sm"
            variant="shadow"
            data-hover=""
          >
            Create account
          </Button>
        </Link>
        <div className="flex flex-col gap-2 w-full mt-6">
          <h1 className=" ">Already have an account? </h1>
          <Link href="/auth/sign-in" className="">
            <Button
              className="w-full text-lg"
              color="primary"
              radius="sm"
              variant="shadow"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Welcome;
