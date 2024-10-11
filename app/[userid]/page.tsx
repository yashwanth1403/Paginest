import { Button } from "@/components/ui/button";

import { auth } from "@/auth";
import SignOutButton from "@/components/Auth/SignOutButton";
import { getUserById } from "@/data/user";
import Image from "next/image";
export default async function Page({ params }: { params: { userid: string } }) {
  const user = await getUserById(params.userid);
  const session = await auth();
  if (!user) {
    return <div>No user found</div>;
  }
  if (session?.user.id !== user.id) {
    return <div>no user found</div>;
  }

  return (
    <div>
      <div className="text-sm md:text-xl p-6">
        <Image
          src={user.image || " "}
          alt="User profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        welcome <b>{session?.user.name}</b>
        <p>email:{session?.user.email}</p>
      </div>
      <SignOutButton />
    </div>
  );
}
