"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
const SocialAuth = () => {
  return (
    <div className="space-y-2">
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => {
          signIn("google", { callbackUrl: "http://localhost:3000" });
        }}
      >
        <FcGoogle className="mr-2 h-4 w-4" /> continue with google
      </Button>
      <Button variant={"outline"} className="w-full">
        <AiFillGithub className="mr-2 h-4 w-4" /> continue with github
      </Button>
    </div>
  );
};

export default SocialAuth;
