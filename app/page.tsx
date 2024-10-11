import Appbar from "@/components/Appbar";
import Hero from "@/components/Hero";
import { auth } from "@/auth";
import prisma from "@/lib/db";
export default async function Home() {
  // const newUser = await prisma.user.findFirst({
  //   where: {
  //     email: "chandrareddym15@gmail.com",
  //   },
  // });
  // console.log(newUser);
  return (
    <div className="flex flex-col min-h-full gap-7">
      <Appbar />
      <Hero />
    </div>
  );
}
