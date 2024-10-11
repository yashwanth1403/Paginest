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
        onClick={async () => {
          try {
            const result = await signIn("google");
            if (result?.ok) {
              // Reload the page after successful sign-in
              window.location.reload();
            } else {
              console.log("Sign-in failed");
            }
          } catch (error) {
            console.error("Error during Google sign-in:", error);
          }
        }}
      >
        <FcGoogle className="mr-2 h-4 w-4" /> Continue with Google
      </Button>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={async () => {
          const result = await signIn("github", { redirect: false });
          console.log(result);
        }}
      >
        <AiFillGithub className="mr-2 h-4 w-4" /> Continue with GitHub
      </Button>
    </div>
  );
};

export default SocialAuth;
