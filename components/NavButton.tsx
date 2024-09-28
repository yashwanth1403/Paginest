"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function NavButton({ type, variant }: { type: string; variant: any }) {
  const router = useRouter();
  return (
    <div>
      {type === "signin" ? (
        <Button
          variant={variant}
          size={"nav"}
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </Button>
      ) : (
        <Button
          variant={variant}
          size={"nav"}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Get PagiNest free
        </Button>
      )}
    </div>
  );
}
