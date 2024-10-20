import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Children, ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-full relative h-full dark:bg-[#191919] dark:text-[#E0E0E0]">
      {children}
    </div>
  );
}
