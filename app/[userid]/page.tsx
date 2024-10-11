import { Button } from "@/components/ui/button";

import { auth } from "@/auth";
import SignOutButton from "@/components/Auth/SignOutButton";
import { getUserById } from "@/data/user";
import Image from "next/image";
export default async function Page({ params }: { params: { userid: string } }) {
  const user = await getUserById(params.userid);
  if (!user) {
    return <div>No user found</div>;
  }
  const session = await auth();
  return (
    <div>
      <div className="text-xl">
        <Image src={user.image || " "} alt="No avatar"></Image>
        welcome <b>{session?.user.name}</b>
        <p>email:{session?.user.email}</p>
      </div>
      <SignOutButton />
    </div>
  );
}
