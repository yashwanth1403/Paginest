import { auth } from "@/auth";
import SignOutButton from "@/components/Auth/SignOutButton";
import Image from "next/image";
import Navigation from "../_components/Navigation";
export default async function Documents() {
  const session = await auth();
  return (
    <div className="w-full h-full">
      <Navigation />
    </div>
  );
}
