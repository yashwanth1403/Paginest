import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../mode-toggle";
import LogoWrapper from "../LogoWrapper";

export default function Authbanner() {
  return (
    <div className="flex items-center justify-between px-6 py-2">
      <Link href={"/"} passHref>
        <div className="max-w-screen-lg flex items-center gap-1">
          <LogoWrapper styleImage="md:w-[70px] md:h-[70px]" />
          <h1 className=" font-semibold text-lg md:text-2xl">PagiNest</h1>
        </div>
      </Link>
      <ModeToggle />
    </div>
  );
}
