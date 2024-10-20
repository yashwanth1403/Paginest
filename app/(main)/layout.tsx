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
  return <div className="w-full relative h-full">{children}</div>;
}
