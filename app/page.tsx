import Appbar from "@/components/Appbar";
import Hero from "@/components/Hero";
import { auth } from "@/auth";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-full gap-7">
      <Appbar />
      <Hero />
    </div>
  );
}
