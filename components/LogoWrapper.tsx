"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const LogoWrapper = ({ styleImage }: { styleImage: string }) => {
  return (
    <div>
      <Image
        src={"/logo.png"}
        alt="logo PagiNest"
        width={50}
        height={50}
        className={cn(styleImage, "dark:hidden")}
      ></Image>
      <Image
        src={"/logo-dark.png"}
        alt="logo PagiNest"
        width={50}
        height={50}
        className={cn(styleImage, "hidden display dark:block")}
      ></Image>
    </div>
  );
};

export default LogoWrapper;
