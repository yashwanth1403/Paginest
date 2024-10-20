"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserNav = () => {
  const { data: session } = useSession();
  const fallbackText = session?.user.name
    ? session.user.name.charAt(0).toUpperCase()
    : "U"; // Default to 'U' if no name is available

  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      <div className="text-sm">{session?.user.name?.toUpperCase()}</div>
    </div>
  );
};

export default UserNav;
