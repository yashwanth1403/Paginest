"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
const SignOutButton = () => {
  return (
    <Button
      onClick={async () => {
        await signOut();
      }}
    >
      signout
    </Button>
  );
};

export default SignOutButton;
