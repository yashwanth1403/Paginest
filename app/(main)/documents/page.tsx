import { auth } from "@/auth";
import Navigation from "../_components/Navigation";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default async function Documents() {
  const session = await auth();

  return (
    <div className="w-full h-full">
      <Navigation />
    </div>
  );
}
