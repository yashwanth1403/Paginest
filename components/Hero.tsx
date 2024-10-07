"use client";
import Image from "next/image";
import { NavButton } from "./NavButton";
const Hero = () => {
  return (
    <div className="flex-1 px-6 py-0 my-20 md:py-2">
      <div className="flex flex-col-reverse gap-5 lg:flex-row-reverse w-full">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-3xl font-extrabold text-center lg:text-4xl ">
            Unleash your potential, streamline your workflow. Where ideas,
            tasks, and notes come together in perfect harmony.
          </h1>
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-center">
            <NavButton type="signin" variant={"herologin"} />
            <NavButton type="signup" variant={"herosignup"} />
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src={"/Hero-paginest.jpg"}
            alt="Hero-paginest"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
